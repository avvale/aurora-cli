import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamRole } from '@apps/iam/iam.types';
import { roleColumnsConfig, RoleService } from '@apps/iam/role';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { permissionColumnsConfig } from '../permission';

export const rolePaginationResolver: ResolveFn<GridData<IamRole>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const roleService = inject(RoleService);

    actionService.action({
        id          : 'iam::role.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::role.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'iam::role.list.pagination');
    gridStateService.setExportActionId(gridId, 'iam::role.list.export');

    // get roles with pagination
    roleService.get().subscribe();

    return roleService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: roleColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const roleNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'iam::role.detail.new',
        isViewAction: true,
    });
};

export const roleEditResolver: ResolveFn<{
    object: IamRole;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const roleService = inject(RoleService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);


    actionService.action({
        id          : 'iam::role.detail.edit',
        isViewAction: true,
    });

    const permissionsRolesGridId = 'iam::role.detail.permissionsRolesGridList';
    gridStateService.setPaginationActionId(permissionsRolesGridId, 'iam::role.detail.permissionsRolesPagination');
    gridStateService.setExportActionId(permissionsRolesGridId, 'iam::role.detail.exportPermissionsRoles');

    const permissionsGridId = 'iam::role.detail.permissionsGridList';
    gridStateService.setPaginationActionId(permissionsGridId, 'iam::role.detail.permissionsPagination');
    gridStateService.setExportActionId(permissionsGridId, 'iam::role.detail.exportPermissions');

    return roleService.findByIdWithRelations({
        id        : route.paramMap.get('id'),
        constraint: {
            include: [
                {
                    association: 'permissions',
                },
            ],
        },
        queryPaginatePermissionsRoles: QueryStatementHandler
            .init({ columnsConfig: permissionColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(permissionsRolesGridId))
            .setSort(gridStateService.getSort(permissionsRolesGridId, { active: 'permission.name', direction: 'asc' }))
            .setPage(gridStateService.getPage(permissionsRolesGridId))
            .setSearch(gridStateService.getSearchState(permissionsRolesGridId))
            .getQueryStatement(),
        queryPaginatePermissions: QueryStatementHandler
            .init({ columnsConfig: permissionColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(permissionsGridId))
            .setSort(gridStateService.getSort(permissionsGridId, { active: 'name', direction: 'asc' }))
            .setPage(gridStateService.getPage(permissionsGridId))
            .setSearch(gridStateService.getSearchState(permissionsGridId))
            .getQueryStatement(),
        queryGetPermissionsRoles: {
            where: {
                roleId: route.paramMap.get('id'),
            },
        },
    });
};
