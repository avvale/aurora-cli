import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { IamPermission, IamPermissionRole, IamRole } from '@apps/iam';
import { permissionColumnsConfig } from '@apps/iam/permission';
import { roleColumnsConfig, RoleService } from '@apps/iam/role';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';
import {
    permissionRoleGridId,
    permissionsGridId,
} from './role-detail.component';

export const rolePaginationResolver: ResolveFn<GridData<IamRole>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const roleService = inject(RoleService);

    actionService.action({
        id: 'iam::role.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::role.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'iam::role.list.pagination');
    gridStateService.setExportActionId(gridId, 'iam::role.list.export');

    // get roles with pagination
    roleService.get().subscribe();

    return roleService.pagination({
        query: queryStatementHandler({ columnsConfig: roleColumnsConfig })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const roleNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'iam::role.detail.new',
        isViewAction: true,
    });
};

export const roleEditResolver: ResolveFn<{
    iamGetPermissionsRoles: IamPermissionRole[];
    iamPaginatePermissions: GridData<IamPermission>;
    iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
    object: IamRole;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const roleService = inject(RoleService);

    // paginate to manage PermissionsRoles grid-select-multiple-elements
    gridStateService.setPaginationActionId(
        permissionRoleGridId,
        'iam::role.detail.permissionsRolesPagination',
    );
    gridStateService.setExportActionId(
        permissionRoleGridId,
        'iam::role.detail.exportPermissionsRoles',
    );

    gridStateService.setPaginationActionId(
        permissionsGridId,
        'iam::role.detail.permissionsPagination',
    );
    gridStateService.setExportActionId(
        permissionsGridId,
        'iam::role.detail.exportPermissions',
    );

    actionService.action({
        id: 'iam::role.detail.edit',
        isViewAction: true,
    });

    return roleService.findByIdWithRelations({
        id: route.paramMap.get('id'),
        constraint: {
            include: [
                {
                    association: 'permissions',
                },
            ],
        },
        queryPaginatePermissionsRoles: queryStatementHandler({
            columnsConfig: permissionColumnsConfig(),
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(
                    permissionRoleGridId,
                ),
            )
            .setSort(
                gridStateService.getSort(permissionRoleGridId, {
                    active: 'permission.name',
                    direction: 'asc',
                }),
            )
            .setPage(gridStateService.getPage(permissionRoleGridId))
            .setSearch(gridStateService.getSearchState(permissionRoleGridId))
            .getQueryStatement(),
        queryPaginatePermissions: queryStatementHandler({
            columnsConfig: permissionColumnsConfig(),
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(
                    permissionsGridId,
                ),
            )
            .setSort(
                gridStateService.getSort(permissionsGridId, {
                    active: 'name',
                    direction: 'asc',
                }),
            )
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
