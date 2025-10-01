import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTenant } from '@apps/iam';
import { tenantColumnsConfig, TenantService } from '@apps/iam/tenant';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, queryStatementHandler } from '@aurora';

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
        query: queryStatementHandler({ columnsConfig: tenantColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const tenantNewResolver: ResolveFn<{
    iamGetTenants: IamTenant[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const tenantService = inject(TenantService);

    actionService.action({
        id          : 'iam::tenant.detail.new',
        isViewAction: true,
    });

    return tenantService.getRelations({
    });
};

export const tenantEditResolver: ResolveFn<{
    iamGetTenants: IamTenant[];
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
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
