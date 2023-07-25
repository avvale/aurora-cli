import { CommonLang } from '../common.types';
import { langColumnsConfig } from './lang.columns-config';
import { LangService } from './lang.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const langPaginationResolver: ResolveFn<GridData<CommonLang>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const langService = inject(LangService);

    actionService.action({
        id          : 'common::lang.list.view',
        isViewAction: true,
    });

    const gridId = 'common::lang.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'common::lang.list.pagination');
    gridStateService.setExportActionId(gridId, 'common::lang.list.export');

    return langService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: langColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const langNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);

    return actionService.action({
        id          : 'common::lang.detail.new',
        isViewAction: true,
    });
};

export const langEditResolver: ResolveFn<{
	object: CommonLang;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const langService = inject(LangService);

    actionService.action({
        id          : 'common::lang.detail.edit',
        isViewAction: true,
    });

    return langService
        .findById({
            id: route.paramMap.get('id'),
        });
};
