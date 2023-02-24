import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { OAuthRefreshToken } from '../o-auth.types';
import { refreshTokenColumnsConfig } from './refresh-token.columns-config';
import { RefreshTokenService } from './refresh-token.service';

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenPaginationResolver implements Resolve<GridData<OAuthRefreshToken>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly refreshTokenService: RefreshTokenService,
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
    ): Observable<GridData<OAuthRefreshToken>>
    {
        const gridId = 'oAuth::refreshToken.list.mainGridList';
        this.actionService.action({ id: 'oAuth::refreshToken.list.view' });
        this.gridStateService.setPaginationActionId(gridId, 'oAuth::refreshToken.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'oAuth::refreshToken.list.export');
        return this.refreshTokenService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: refreshTokenColumnsConfig })
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
export class RefreshTokenNewResolver implements Resolve<Action>
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
            id          : 'oAuth::refreshToken.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenEditResolver implements Resolve<{
    object: OAuthRefreshToken;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly refreshTokenService: RefreshTokenService,
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
        object: OAuthRefreshToken;
    }>
    {
        this.actionService.action({
            id          : 'oAuth::refreshToken.detail.edit',
            isViewAction: true,
        });
        return this.refreshTokenService.findById({ id: route.paramMap.get('id') });
    }
}
