import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { OAuthAccessToken } from '@apps/o-auth';
import {
    accessTokenColumnsConfig,
    AccessTokenService,
} from '@apps/o-auth/access-token';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const accessTokenPaginationResolver: ResolveFn<
    GridData<OAuthAccessToken>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const accessTokenService = inject(AccessTokenService);

    actionService.action({
        id: 'oAuth::accessToken.list.view',
        isViewAction: true,
    });

    const gridId = 'oAuth::accessToken.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'oAuth::accessToken.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'oAuth::accessToken.list.export',
    );

    return accessTokenService.pagination({
        query: queryStatementHandler({
            columnsConfig: accessTokenColumnsConfig,
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

export const accessTokenNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'oAuth::accessToken.detail.new',
        isViewAction: true,
    });
};

export const accessTokenEditResolver: ResolveFn<{
    object: OAuthAccessToken;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const accessTokenService = inject(AccessTokenService);
    const actionService = inject(ActionService);

    actionService.action({
        id: 'oAuth::accessToken.detail.edit',
        isViewAction: true,
    });

    return accessTokenService.findById({
        id: route.paramMap.get('id'),
    });
};
