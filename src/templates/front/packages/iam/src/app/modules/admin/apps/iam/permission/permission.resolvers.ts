import { IamBoundedContext } from '../iam.types';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamPermission } from '@apps/iam/iam.types';
import { permissionColumnsConfig, PermissionService } from '@apps/iam/permission';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const permissionPaginationResolver: ResolveFn<GridData<IamPermission>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const permissionService = inject(PermissionService);

    actionService.action({
        id          : 'iam::permission.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::permission.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'iam::permission.list.pagination');
    gridStateService.setExportActionId(gridId, 'iam::permission.list.export');

    return permissionService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: permissionColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const permissionNewResolver: ResolveFn<{
    iamGetBoundedContexts: IamBoundedContext[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const permissionService = inject(PermissionService);

    actionService.action({
        id          : 'iam::permission.detail.new',
        isViewAction: true,
    });

    return permissionService.getRelations();
};

export const permissionEditResolver: ResolveFn<{
    iamGetBoundedContexts: IamBoundedContext[];
    object: IamPermission;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const permissionService = inject(PermissionService);

    actionService.action({
        id          : 'iam::permission.detail.edit',
        isViewAction: true,
    });

    return permissionService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
