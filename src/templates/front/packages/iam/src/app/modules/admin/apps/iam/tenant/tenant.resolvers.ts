import { IamTenant } from '../iam.types';
import { tenantColumnsConfig } from './tenant.columns-config';
import { TenantService } from './tenant.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const tenantPaginationResolver: ResolveFn<GridData<IamTenant>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const tenantService = inject(TenantService);

    actionService.action({
        id          : 'iam::tenant.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::tenant.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'iam::tenant.list.pagination');
    gridStateService.setExportActionId(gridId, 'iam::tenant.list.export');

    return tenantService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: tenantColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const tenantNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'iam::tenant.detail.new',
        isViewAction: true,
    });
};

export const tenantEditResolver: ResolveFn<{
    object: IamTenant;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const tenantService = inject(TenantService);

    actionService.action({
        id          : 'iam::tenant.detail.edit',
        isViewAction: true,
    });

    return tenantService
        .findById({
            id: route.paramMap.get('id'),
        });
};
