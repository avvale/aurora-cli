import { IamBoundedContext, IamPermission } from '../iam.types';
import { permissionColumnsConfig } from '../permission/permission.columns-config';
import { boundedContextColumnsConfig } from './bounded-context.columns-config';
import { BoundedContextService } from './bounded-context.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const boundedContextPaginationResolver: ResolveFn<GridData<IamBoundedContext>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const boundedContextService = inject(BoundedContextService);

    actionService.action({
        id          : 'iam::boundedContext.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::boundedContext.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'iam::boundedContext.list.pagination');
    gridStateService.setExportActionId(gridId, 'iam::boundedContext.list.export');

    return boundedContextService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: boundedContextColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const boundedContextNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);

    return actionService.action({
        id          : 'iam::boundedContext.detail.new',
        isViewAction: true,
    });
};

export const boundedContextEditResolver: ResolveFn<{
	iamPaginatePermissions: GridData<IamPermission>;
	object: IamBoundedContext;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const boundedContextService = inject(BoundedContextService);
	const gridFiltersStorageService = inject(GridFiltersStorageService);
	const gridStateService = inject(GridStateService);

    // paginate to manage permissions grid-elements-manager
    const permissionsGridId = 'iam::boundedContext.detail.permissionsGridList';
    gridStateService.setPaginationActionId(permissionsGridId, 'iam::boundedContext.detail.permissionsPagination');
    gridStateService.setExportActionId(permissionsGridId, 'iam::boundedContext.detail.exportPermissions');

    actionService.action({
        id          : 'iam::boundedContext.detail.edit',
        isViewAction: true,
    });

    return boundedContextService
        .findByIdWithRelations({
            id                      : route.paramMap.get('id'),
            queryPaginatePermissions: QueryStatementHandler
                .init({ columnsConfig: permissionColumnsConfig })
                .setColumFilters(gridFiltersStorageService.getColumnFilterState(permissionsGridId))
                .setSort(gridStateService.getSort(permissionsGridId, { active: 'name', direction: 'asc' }))
                .setPage(gridStateService.getPage(permissionsGridId))
                .setSearch(gridStateService.getSearchState(permissionsGridId))
                .getQueryStatement(),
            constraintPaginatePermissions: {
                where: {
                    boundedContextId: route.paramMap.get('id'),
                },
            },
        });
};
