import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { IamBoundedContext, IamPermission } from '@apps/iam';
import {
    boundedContextColumnsConfig,
    BoundedContextService,
} from '@apps/iam/bounded-context';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';
import { permissionColumnsConfig } from '../permission';

export const boundedContextPaginationResolver: ResolveFn<
    GridData<IamBoundedContext>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const boundedContextService = inject(BoundedContextService);

    actionService.action({
        id: 'iam::boundedContext.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::boundedContext.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'iam::boundedContext.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'iam::boundedContext.list.export',
    );

    return boundedContextService.pagination({
        query: queryStatementHandler({
            columnsConfig: boundedContextColumnsConfig,
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const boundedContextNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'iam::boundedContext.detail.new',
        isViewAction: true,
    });
};

export const boundedContextEditResolver: ResolveFn<{
    iamPaginatePermissions: GridData<IamPermission>;
    object: IamBoundedContext;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const boundedContextService = inject(BoundedContextService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);

    // paginate to manage permissions grid-elements-manager
    const permissionsGridId = 'iam::boundedContext.detail.permissionsGridList';
    gridStateService.setPaginationActionId(
        permissionsGridId,
        'iam::boundedContext.detail.permissionsPagination',
    );
    gridStateService.setExportActionId(
        permissionsGridId,
        'iam::boundedContext.detail.exportPermissions',
    );

    actionService.action({
        id: 'iam::boundedContext.detail.edit',
        isViewAction: true,
    });

    return boundedContextService.findByIdWithRelations({
        id: route.paramMap.get('id'),
        queryPaginatePermissions: queryStatementHandler({
            columnsConfig: permissionColumnsConfig(),
        })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(
                    permissionsGridId,
                ),
            )
            .setSort(gridStateService.getSort(permissionsGridId))
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
