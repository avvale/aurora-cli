import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { IamPermission, IamPermissionRole, IamRole } from '../iam.types';
import { permissionColumnsConfig } from '../permission/permission.columns-config';
import { roleColumnsConfig } from './role.columns-config';
import { RoleService } from './role.service';

@Injectable({
    providedIn: 'root',
})
export class RolePaginationResolver implements Resolve<GridData<IamRole>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly roleService: RoleService,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<GridData<IamRole>>
    {
        this.actionService.action({
            id          : 'iam::role.list.view',
            isViewAction: true,
        });
        const gridId = 'iam::role.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'iam::role.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'iam::role.list.export');
        return this.roleService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: roleColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(gridId))
                .setSort(this.gridStateService.getSort(gridId))
                .setPage(this.gridStateService.getPage(gridId))
                .setSearch(this.gridStateService.getSearchState(gridId))
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class RoleNewResolver implements Resolve<Action>
{
    constructor(
        private readonly actionService: ActionService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Action
    {
        return this.actionService.action({ id: 'iam::role.detail.new' });
    }
}

@Injectable({
    providedIn: 'root',
})
export class RoleEditResolver implements Resolve<{
    object: IamRole;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly roleService: RoleService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
        object: IamRole;
        iamPaginatePermissions: GridData<IamPermission>;
        iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
        iamGetPermissionsRoles: IamPermissionRole[];
    }>
    {
        this.actionService.action({
            id          : 'iam::role.detail.edit',
            isViewAction: true,
        });

        const permissionsRolesGridId = 'iam::role.detail.permissionsRolesGridList';
        this.gridStateService.setPaginationActionId(permissionsRolesGridId, 'iam::role.detail.permissionsRolesPagination');
        this.gridStateService.setExportActionId(permissionsRolesGridId, 'iam::role.detail.exportPermissionsRoles');

        const permissionsGridId = 'iam::role.detail.permissionsGridList';
        this.gridStateService.setPaginationActionId(permissionsGridId, 'iam::role.detail.permissionsPagination');
        this.gridStateService.setExportActionId(permissionsGridId, 'iam::role.detail.exportPermissions');

        return this.roleService.findByIdWithRelations({
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
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(permissionsRolesGridId))
                .setSort(this.gridStateService.getSort(permissionsRolesGridId, { active: 'permission.name', direction: 'asc' }))
                .setPage(this.gridStateService.getPage(permissionsRolesGridId))
                .setSearch(this.gridStateService.getSearchState(permissionsRolesGridId))
                .getQueryStatement(),
            queryPaginatePermissions: QueryStatementHandler
                .init({ columnsConfig: permissionColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(permissionsGridId))
                .setSort(this.gridStateService.getSort(permissionsGridId, { active: 'name', direction: 'asc' }))
                .setPage(this.gridStateService.getPage(permissionsGridId))
                .setSearch(this.gridStateService.getSearchState(permissionsGridId))
                .getQueryStatement(),
            queryGetPermissionsRoles: {
                where: {
                    roleId: route.paramMap.get('id'),
                },
            },
        });
    }
}
