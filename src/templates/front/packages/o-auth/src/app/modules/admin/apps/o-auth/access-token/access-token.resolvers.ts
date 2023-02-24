import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { OAuthAccessToken } from '../o-auth.types';
import { accessTokenColumnsConfig } from './access-token.columns-config';
import { AccessTokenService } from './access-token.service';

@Injectable({
    providedIn: 'root',
})
export class AccessTokenPaginationResolver implements Resolve<GridData<OAuthAccessToken>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly accessTokenService: AccessTokenService,
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
    ): Observable<GridData<OAuthAccessToken>>
    {
        this.actionService.action({
            id          : 'oAuth::accessToken.list.view',
            isViewAction: true,
        });
        const gridId = 'oAuth::accessToken.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'oAuth::accessToken.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'oAuth::accessToken.list.export');
        return this.accessTokenService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: accessTokenColumnsConfig })
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
export class AccessTokenNewResolver implements Resolve<Action>
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
            id          : 'oAuth::accessToken.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class AccessTokenEditResolver implements Resolve<{
    object: OAuthAccessToken;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly accessTokenService: AccessTokenService,
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
        object: OAuthAccessToken;
    }>
    {
        this.actionService.action({
            id          : 'oAuth::accessToken.detail.edit',
            isViewAction: true,
        });
        return this.accessTokenService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
