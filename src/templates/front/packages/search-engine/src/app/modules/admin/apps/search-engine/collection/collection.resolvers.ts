import { fieldColumnsConfig } from '../field/field.columns-config';
import { SearchEngineField } from '../search-engine.types';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { collectionColumnsConfig, CollectionService } from '@apps/search-engine/collection';
import { SearchEngineCollection } from '@apps/search-engine/search-engine.types';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const collectionPaginationResolver: ResolveFn<GridData<SearchEngineCollection>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const collectionService = inject(CollectionService);

    actionService.action({
        id          : 'searchEngine::collection.list.view',
        isViewAction: true,
    });

    const gridId = 'searchEngine::collection.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'searchEngine::collection.list.pagination');
    gridStateService.setExportActionId(gridId, 'searchEngine::collection.list.export');

    return collectionService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: collectionColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const collectionNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'searchEngine::collection.detail.new',
        isViewAction: true,
    });
};

export const collectionEditResolver: ResolveFn<{
    object: SearchEngineCollection;
    searchEnginePaginateFields: GridData<SearchEngineField>;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const collectionService = inject(CollectionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);

    // paginate to manage fields grid-elements-manager
    const fieldsGridId = 'searchEngine::collection.detail.fieldsGridList';
    gridStateService.setPaginationActionId(fieldsGridId, 'searchEngine::collection.detail.fieldsPagination');
    gridStateService.setExportActionId(fieldsGridId, 'searchEngine::collection.detail.exportFields');

    actionService.action({
        id          : 'searchEngine::collection.detail.edit',
        isViewAction: true,
    });

    return collectionService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
            queryPaginateFields: QueryStatementHandler
                .init({ columnsConfig: fieldColumnsConfig })
                .setColumFilters(gridFiltersStorageService.getColumnFilterState(fieldsGridId))
                .setSort(gridStateService.getSort(fieldsGridId))
                .setPage(gridStateService.getPage(fieldsGridId))
                .setSearch(gridStateService.getSearchState(fieldsGridId))
                .getQueryStatement(),
            constraintPaginateFields: {
                where: {
                    collectionId: route.paramMap.get('id'),
                },
            },
        });
};
