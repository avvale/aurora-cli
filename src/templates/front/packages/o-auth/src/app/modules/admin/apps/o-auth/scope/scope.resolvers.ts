import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { OAuthScope } from '../o-auth.types';
import { scopeColumnsConfig } from './scope.columns-config';
import { ScopeService } from './scope.service';

@Injectable({
    providedIn: 'root',
})
export class ScopePaginationResolver implements Resolve<GridData<OAuthScope>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly scopeService: ScopeService,
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
    ): Observable<GridData<OAuthScope>>
    {
        const gridId = 'oAuth::scope.list.mainGridList';
        this.actionService.action({ id: 'oAuth::scope.list.view' });
        this.gridStateService.setPaginationActionId(gridId, 'oAuth::scope.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'oAuth::scope.list.export');
        return this.scopeService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: scopeColumnsConfig })
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
export class ScopeNewResolver implements Resolve<Action>
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
            id          : 'oAuth::scope.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class ScopeEditResolver implements Resolve<{
    object: OAuthScope;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly scopeService: ScopeService,
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
        object: OAuthScope;
    }>
    {
        this.actionService.action({
            id          : 'oAuth::scope.detail.edit',
            isViewAction: true,
        });
        return this.scopeService.findById({ id: route.paramMap.get('id') });
    }
}
