import { signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ColumnConfig, GridColumnFilter, GridData, QueryStatement, log, queryStatementHandler } from '@aurora';
import { debounceTime, lastValueFrom } from 'rxjs';
import { AsyncMatSelectSearchState } from './async-mat-select-search.types';

export const initAsyncMatSelectSearchState = <T>(): AsyncMatSelectSearchState<T> =>
{
    return {
        page: {
            pageIndex: 1,
            pageSize : 10,
        },
        paginationPageIndex: 1,
        columnFilters      : [],
        currentCount       : 0,
        itemsToShow        : [],
        foundItemsToShow   : [],
        itemFilterCtrl     : new FormControl<string>(''),
        selectedItems      : signal(new Set()),
        filteredItems      : signal(new Set()),
        isLoading          : signal(false),
        keyword            : '',
    };
};

export const initAsyncMatSelectSearch = <T>(
    {
        asyncMatSelectSearchState = null,
        manageAsyncMatSelectSearch = null,
        itemPagination = null,
        initSelectedItems = [],
    }: {
        asyncMatSelectSearchState?: AsyncMatSelectSearchState<T>;
        manageAsyncMatSelectSearch?: <T>(
            params: {
                asyncMatSelectSearchState?: AsyncMatSelectSearchState<T>;
                isFromScrollEndEvent?: boolean;
                keyword?: string;
                noResultsFoundTranslation?: string;
            }
        ) => Promise<void>;
        itemPagination?: GridData<T>;
        initSelectedItems?: T[];
    } = {},
): void =>
{
    if (Array.isArray(initSelectedItems) && initSelectedItems.length)
    {
        asyncMatSelectSearchState
            .selectedItems
            .update(
                selectedItemsSet =>
                {
                    for (const selectedItem of initSelectedItems)
                        selectedItemsSet.add(selectedItem);

                    return selectedItemsSet;
                });
    }

    // init select filter with all items
    asyncMatSelectSearchState.itemsToShow= itemPagination.rows;
    asyncMatSelectSearchState.filteredItems.set(new Set(itemPagination.rows));
    asyncMatSelectSearchState.currentCount = itemPagination.count;

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
            manageAsyncMatSelectSearch<T>({
                asyncMatSelectSearchState,
            });
        });
};

export const manageAsyncMatSelectSearch = ({
    columnFilter = null,
    paginationService = null,
    paginationConstraint = null,
}: {
    columnFilter?: GridColumnFilter;
    paginationService?: any;
    paginationConstraint?: QueryStatement;
} = {}) =>
{
    return async <T>(
        {
            asyncMatSelectSearchState = null,
            isFromScrollEndEvent = null,
            noResultsFoundTranslation = 'No Results Found',
        }: {
            asyncMatSelectSearchState?: AsyncMatSelectSearchState<T>;
            isFromScrollEndEvent?: boolean;
            noResultsFoundTranslation?: string;
        } = {},
    ): Promise<void> =>
    {
        const pagination = asyncMatSelectSearchState.page;
        const hasSearch = !!asyncMatSelectSearchState.keyword;

        // when when search by keyword
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
            // reset organizationalEntitiesFound to show pagination results
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
            asyncMatSelectSearchState.filteredItems.set(new Set(asyncMatSelectSearchState.itemsToShow));

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
        const itemsPagination = await lastValueFrom<GridData<T>>(
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
                    } as T];
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
                } as T];
            }
            else
            {
                asyncMatSelectSearchState.itemsToShow.push(...itemsPagination.rows);
            }
        }

        // show pagination or search results
        asyncMatSelectSearchState.filteredItems.set(
            new Set(
                asyncMatSelectSearchState.foundItemsToShow.length > 0 ?
                    asyncMatSelectSearchState.foundItemsToShow :
                    asyncMatSelectSearchState.itemsToShow,
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
