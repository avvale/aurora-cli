import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { IamBoundedContext } from '../iam.types';
import { permissionColumnsConfig } from '../permission/permission.columns-config';
import { boundedContextColumnsConfig } from './bounded-context.columns-config';
import { BoundedContextService } from './bounded-context.service';

@Injectable({
    providedIn: 'root',
})
export class BoundedContextPaginationResolver implements Resolve<GridData<IamBoundedContext>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly boundedContextService: BoundedContextService,
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
    ): Observable<GridData<IamBoundedContext>>
    {
        this.actionService.action({
            id          : 'iam::boundedContext.list.view',
            isViewAction: true,
        });
        const gridId = 'iam::boundedContext.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'iam::boundedContext.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'iam::boundedContext.list.export');
        return this.boundedContextService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: boundedContextColumnsConfig })
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
export class BoundedContextNewResolver implements Resolve<Action>
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
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Action
    {
        return this.actionService.action({
            id          : 'iam::boundedContext.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class BoundedContextEditResolver implements Resolve<{
    object: IamBoundedContext;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly boundedContextService: BoundedContextService,
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
        object: IamBoundedContext;
    }>
    {
        this.actionService.action({
            id          : 'iam::boundedContext.detail.edit',
            isViewAction: true,
        });
        const permissionsGridId: string = 'iam::boundedContext.detail.permissionsGridList';
        this.gridStateService.setPaginationActionId(permissionsGridId, 'iam::boundedContext.detail.permissionsPagination');
        this.gridStateService.setExportActionId(permissionsGridId, 'iam::boundedContext.detail.exportPermissions');
        return this.boundedContextService.findByIdWithRelations({
            id                      : route.paramMap.get('id'),
            queryPaginatePermissions: QueryStatementHandler
                .init({ columnsConfig: permissionColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(permissionsGridId))
                .setSort(this.gridStateService.getSort(permissionsGridId, { active: 'name', direction: 'asc' }))
                .setPage(this.gridStateService.getPage(permissionsGridId))
                .setSearch(this.gridStateService.getSearchState(permissionsGridId))
                .getQueryStatement(),
            constraintPaginatePermissions: {
                where: {
                    boundedContextId: route.paramMap.get('id'),
                },
            },
        });
    }
}
