import { CommonAdministrativeAreaLevel2 } from '../common.types';
import { administrativeAreaLevel2ColumnsConfig } from './administrative-area-level-2.columns-config';
import { AdministrativeAreaLevel2Service } from './administrative-area-level-2.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const administrativeAreaLevel2PaginationResolver: ResolveFn<GridData<CommonAdministrativeAreaLevel2>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const administrativeAreaLevel2Service = inject(AdministrativeAreaLevel2Service);

    actionService.action({
        id          : 'common::administrativeAreaLevel2.list.view',
        isViewAction: true,
    });

    const gridId = 'common::administrativeAreaLevel2.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'common::administrativeAreaLevel2.list.pagination');
    gridStateService.setExportActionId(gridId, 'common::administrativeAreaLevel2.list.export');

    return administrativeAreaLevel2Service.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: administrativeAreaLevel2ColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const administrativeAreaLevel2NewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);

    return actionService.action({
        id          : 'common::administrativeAreaLevel2.detail.new',
        isViewAction: true,
    });
};

export const administrativeAreaLevel2EditResolver: ResolveFn<{
	object: CommonAdministrativeAreaLevel2;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const administrativeAreaLevel2Service = inject(AdministrativeAreaLevel2Service);

    actionService.action({
        id          : 'common::administrativeAreaLevel2.detail.edit',
        isViewAction: true,
    });

    return administrativeAreaLevel2Service
        .findById({
            id: route.paramMap.get('id'),
        });
};
