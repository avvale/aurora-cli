import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { IamTenant } from '../iam.types';
import { tenantColumnsConfig } from './tenant.columns-config';
import { TenantService } from './tenant.service';

@Injectable({
    providedIn: 'root',
})
export class TenantPaginationResolver implements Resolve<GridData<IamTenant>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly tenantService: TenantService,
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
    ): Observable<GridData<IamTenant>>
    {
        this.actionService.action({
            id          : 'iam::tenant.list.view',
            isViewAction: true,
        });
        const gridId = 'iam::tenant.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'iam::tenant.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'iam::tenant.list.export');
        return this.tenantService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: tenantColumnsConfig })
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
export class TenantNewResolver implements Resolve<Action>
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
            id          : 'iam::tenant.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class TenantEditResolver implements Resolve<{
    object: IamTenant;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly tenantService: TenantService,
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
        object: IamTenant;
    }>
    {
        this.actionService.action({
            id          : 'iam::tenant.detail.edit',
            isViewAction: true,
        });
        return this.tenantService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
