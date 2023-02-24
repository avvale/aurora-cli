import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { OAuthClient, OAuthScope } from '../o-auth.types';
import { clientColumnsConfig } from './client.columns-config';
import { ClientService } from './client.service';

@Injectable({
    providedIn: 'root',
})
export class ClientPaginationResolver implements Resolve<GridData<OAuthClient>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly clientService: ClientService,
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
    ): Observable<GridData<OAuthClient>>
    {
        this.actionService.action({
            id          : 'oAuth::client.list.view',
            isViewAction: true,
        });
        const gridId = 'oAuth::client.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'oAuth::client.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'oAuth::client.list.export');
        return this.clientService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: clientColumnsConfig })
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
export class ClientNewResolver implements Resolve<{
    oAuthGetScopes: OAuthScope[];
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly clientService: ClientService,
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
        oAuthGetScopes: OAuthScope[];
    }>
    {
        this.actionService.action({
            id          : 'oAuth::client.detail.new',
            isViewAction: true,
        });
        return this.clientService
            .getRelations();
    }
}

@Injectable({
    providedIn: 'root',
})
export class ClientEditResolver implements Resolve<{
    object: OAuthClient;
    oAuthGetScopes: OAuthScope[];
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly clientService: ClientService,
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
        object: OAuthClient;
        oAuthGetScopes: OAuthScope[];
    }>
    {
        this.actionService.action({
            id          : 'oAuth::client.detail.edit',
            isViewAction: true,
        });
        return this.clientService.findByIdWithRelations({
            id        : route.paramMap.get('id'),
            constraint: {
                include: [
                    { association: 'applications' },
                ],
            },
        });
    }
}
