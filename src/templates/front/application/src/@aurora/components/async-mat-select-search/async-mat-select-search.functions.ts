import { signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ColumnConfig, GridColumnFilter, GridData, QueryStatement, arrayToMap, log, queryStatementHandler } from '@aurora';
import { debounceTime, lastValueFrom } from 'rxjs';
import { AsyncMatSelectSearchState } from './async-mat-select-search.types';

export const initAsyncMatSelectSearchState = <T, E>(): AsyncMatSelectSearchState<T, E> =>
{
    return {
        page: {
            pageIndex: 0,
            pageSize : 10,
        },
        paginationPageIndex: 1,
        columnFilters      : [],
        currentCount       : 0,
        itemsToShow        : [],
        foundItemsToShow   : [],
        itemFilterCtrl     : new FormControl<string>(''),
        selectedItems      : signal(new Map<T, E>()),
        filteredItems      : signal(new Map<T, E>()),
        isLoading          : signal(false),
        keyword            : '',
    };
};

export const initAsyncMatSelectSearch = <T, E>(
    {
        asyncMatSelectSearchState = null,
        manageAsyncMatSelectSearch = null,
        itemPagination = [],
        initSelectedItems = [],
        indexKey = 'id',
    }: {
        asyncMatSelectSearchState?: AsyncMatSelectSearchState<T, E>;
        manageAsyncMatSelectSearch?: <E>(
            params: {
                asyncMatSelectSearchState?: AsyncMatSelectSearchState<T, E>;
                isFromScrollEndEvent?: boolean;
                keyword?: string;
                noResultsFoundTranslation?: string;
            }
        ) => Promise<void>;
        itemPagination?: E[];
        initSelectedItems?: E[];
        indexKey?: string;
    } = {},
): void =>
{
    if (Array.isArray(initSelectedItems) && initSelectedItems.length)
    {
        asyncMatSelectSearchState
            .selectedItems
            .update(
                selectedItemsMap =>
                {
                    for (const selectedItem of initSelectedItems)
                        selectedItemsMap.set(selectedItem['id'], selectedItem);

                    return selectedItemsMap;
                });
    }

    // init select filter with all items
    asyncMatSelectSearchState.itemsToShow = itemPagination;
    asyncMatSelectSearchState.filteredItems.set(arrayToMap<T, E>(itemPagination, indexKey));
    asyncMatSelectSearchState.currentCount = itemPagination.length;

    // listen for country search field value changes
    asyncMatSelectSearchState
        .itemFilterCtrl
        .valueChanges
        .pipe(
            debounceTime(300),
            takeUntilDestroyed(),
        )
        .subscribe(keyword =>
        {
            asyncMatSelectSearchState.keyword = keyword;
            manageAsyncMatSelectSearch<E>({
                asyncMatSelectSearchState,
            });
        });
};

export const manageAsyncMatSelectSearch = ({
    columnFilter = null,
    paginationService = null,
    paginationConstraint = {},
    indexKey = 'id',
}: {
    columnFilter?: GridColumnFilter;
    paginationService?: any;
    paginationConstraint?: QueryStatement;
    indexKey?: string;
} = {}) =>
{
    return async <T, E>(
        {
            asyncMatSelectSearchState = null,
            isFromScrollEndEvent = null,
            noResultsFoundTranslation = 'No Results Found',
        }: {
            asyncMatSelectSearchState?: AsyncMatSelectSearchState<T, E>;
            isFromScrollEndEvent?: boolean;
            noResultsFoundTranslation?: string;
        } = {},
    ): Promise<void> =>
    {
        const pagination = asyncMatSelectSearchState.page;
        const hasSearch = !!asyncMatSelectSearchState.keyword;

        // when search by keyword
        if (hasSearch && !isFromScrollEndEvent)
        {
            asyncMatSelectSearchState.columnFilters = [{
                ...columnFilter,
                value: `%${asyncMatSelectSearchState.keyword}%`,
            }];

            asyncMatSelectSearchState.paginationPageIndex = pagination.pageIndex;
            pagination.pageIndex = 0;
        }
        // when scroll to have pagination
        else if (!hasSearch && isFromScrollEndEvent)
        {
            // reset items founded to show pagination results
            asyncMatSelectSearchState.foundItemsToShow = [];
            asyncMatSelectSearchState.columnFilters = [];
            if (asyncMatSelectSearchState.currentCount > pagination.pageIndex * (pagination.pageSize + 1))
            {
                pagination.pageIndex++;
            }
            else
            {
                log('[DEBUG] last pagination');
                return;
            }
        }
        // when reset search
        else if (!hasSearch && !isFromScrollEndEvent)
        {
            // reset organizationalEntitiesFound to show pagination results
            asyncMatSelectSearchState.foundItemsToShow = [];
            asyncMatSelectSearchState.columnFilters = [];
            asyncMatSelectSearchState.filteredItems.set(arrayToMap<T, E>(asyncMatSelectSearchState.itemsToShow, indexKey));

            // retrieves previous pagination
            asyncMatSelectSearchState.page.pageIndex = asyncMatSelectSearchState.paginationPageIndex;

            return;
        }
        // when try paginate with active search
        else if (hasSearch && isFromScrollEndEvent)
        {
            // check if there are more results to paginate
            if (asyncMatSelectSearchState.currentCount > pagination.pageIndex * (pagination.pageSize + 1))
            {
                pagination.pageIndex++;
            }
            else
            {
                log('[DEBUG] last pagination with search');
                return;
            }
        }

        // save pagination in state
        asyncMatSelectSearchState.page = pagination;

        asyncMatSelectSearchState.isLoading.set(true);
        const itemsPagination = await lastValueFrom<GridData<E>>(
            paginationService
                .pagination({
                    query: queryStatementHandler()
                        .setPage(pagination)
                        .setColumFilters(asyncMatSelectSearchState.columnFilters)
                        .getQueryStatement(),
                    constraint: paginationConstraint,
                }),
        );

        // save count in state
        asyncMatSelectSearchState.currentCount = itemsPagination.count;

        if (hasSearch)
        {
            // when scrolling search results
            if (isFromScrollEndEvent)
            {
                asyncMatSelectSearchState.foundItemsToShow.push(...itemsPagination.rows);
            }
            else
            {
                if (itemsPagination.rows.length > 0)
                {
                    asyncMatSelectSearchState.foundItemsToShow = [...itemsPagination.rows];
                }
                else
                {
                    asyncMatSelectSearchState.foundItemsToShow = [{
                        id  : null,
                        name: noResultsFoundTranslation,
                    } as E];
                }
            }
        }
        else
        {
            // when scrolling pagination has not results
            if (asyncMatSelectSearchState.itemsToShow.length === 0 && itemsPagination.rows.length === 0)
            {
                asyncMatSelectSearchState.itemsToShow = [{
                    id  : null,
                    name: noResultsFoundTranslation,
                } as E];
            }
            else
            {
                asyncMatSelectSearchState.itemsToShow.push(...itemsPagination.rows);
            }
        }

        // show pagination or search results
        asyncMatSelectSearchState.filteredItems.set(
            arrayToMap(
                asyncMatSelectSearchState.foundItemsToShow.length > 0 ?
                    asyncMatSelectSearchState.foundItemsToShow :
                    asyncMatSelectSearchState.itemsToShow,
                indexKey,
            ),
        );
        asyncMatSelectSearchState.isLoading.set(false);
    };
};

export const getAsyncMatSelectSearchColumnConfigFunction = (columnsConfig: ColumnConfig[], field: string): any =>
{
    const columnConfig = columnsConfig.find(columnConfig => columnConfig.field === field);

    if (!columnConfig.meta.asyncMatSelectSearch)
    {
        throw new Error(`ColumnConfig with field ${field} does not have asyncMatSelectSearch meta, you need define asyncMatSelectSearch to use ASYNC_MULTIPLE_SELECT.`);
    }
    return columnConfig.meta.asyncMatSelectSearch;
};
