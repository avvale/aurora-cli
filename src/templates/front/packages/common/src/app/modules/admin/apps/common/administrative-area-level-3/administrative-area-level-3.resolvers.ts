import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { administrativeAreaLevel3ColumnsConfig, AdministrativeAreaLevel3Service } from '@apps/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@apps/common/common.types';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const administrativeAreaLevel3PaginationResolver: ResolveFn<GridData<CommonAdministrativeAreaLevel3>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const administrativeAreaLevel3Service = inject(AdministrativeAreaLevel3Service);

    actionService.action({
        id          : 'common::administrativeAreaLevel3.list.view',
        isViewAction: true,
    });

    const gridId = 'common::administrativeAreaLevel3.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'common::administrativeAreaLevel3.list.pagination');
    gridStateService.setExportActionId(gridId, 'common::administrativeAreaLevel3.list.export');

    return administrativeAreaLevel3Service.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: administrativeAreaLevel3ColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const administrativeAreaLevel3NewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'common::administrativeAreaLevel3.detail.new',
        isViewAction: true,
    });
};

export const administrativeAreaLevel3EditResolver: ResolveFn<{
    object: CommonAdministrativeAreaLevel3;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const administrativeAreaLevel3Service = inject(AdministrativeAreaLevel3Service);

    actionService.action({
        id          : 'common::administrativeAreaLevel3.detail.edit',
        isViewAction: true,
    });

    return administrativeAreaLevel3Service
        .findById({
            id: route.paramMap.get('id'),
        });
};
