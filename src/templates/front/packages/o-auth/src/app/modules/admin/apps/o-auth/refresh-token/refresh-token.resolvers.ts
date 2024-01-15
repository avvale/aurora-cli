import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { OAuthRefreshToken } from '@apps/o-auth/o-auth.types';
import { refreshTokenColumnsConfig, RefreshTokenService } from '@apps/o-auth/refresh-token';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const refreshTokenPaginationResolver: ResolveFn<GridData<OAuthRefreshToken>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const refreshTokenService = inject(RefreshTokenService);

    actionService.action({
        id          : 'oAuth::refreshToken.list.view',
        isViewAction: true,
    });

    const gridId = 'oAuth::refreshToken.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'oAuth::refreshToken.list.pagination');
    gridStateService.setExportActionId(gridId, 'oAuth::refreshToken.list.export');

    return refreshTokenService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: refreshTokenColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const refreshTokenNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'oAuth::refreshToken.detail.new',
        isViewAction: true,
    });
};

export const refreshTokenEditResolver: ResolveFn<{
    object: OAuthRefreshToken;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const refreshTokenService = inject(RefreshTokenService);

    actionService.action({
        id          : 'oAuth::refreshToken.detail.edit',
        isViewAction: true,
    });

    return refreshTokenService
        .findById({
            id: route.paramMap.get('id'),
        });
};
