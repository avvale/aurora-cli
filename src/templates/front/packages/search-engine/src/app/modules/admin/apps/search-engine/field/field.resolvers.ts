import { SearchEngineField } from '../search-engine.types';
import { fieldColumnsConfig } from './field.columns-config';
import { FieldService } from './field.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const fieldPaginationResolver: ResolveFn<GridData<SearchEngineField>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const fieldService = inject(FieldService);

    actionService.action({
        id          : 'searchEngine::field.list.view',
        isViewAction: true,
    });

    const gridId = 'searchEngine::field.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'searchEngine::field.list.pagination');
    gridStateService.setExportActionId(gridId, 'searchEngine::field.list.export');

    return fieldService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: fieldColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const fieldNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);

    return actionService.action({
        id          : 'searchEngine::field.detail.new',
        isViewAction: true,
    });
};

export const fieldEditResolver: ResolveFn<{
	object: SearchEngineField;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const fieldService = inject(FieldService);

    actionService.action({
        id          : 'searchEngine::field.detail.edit',
        isViewAction: true,
    });

    return fieldService
        .findById({
            id: route.paramMap.get('id'),
        });
};
