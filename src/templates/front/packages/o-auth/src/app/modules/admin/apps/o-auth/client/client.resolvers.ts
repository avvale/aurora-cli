import { OAuthClient, OAuthScope } from '../o-auth.types';
import { clientColumnsConfig } from './client.columns-config';
import { ClientService } from './client.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const clientPaginationResolver: ResolveFn<GridData<OAuthClient>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const clientService = inject(ClientService);

    actionService.action({
        id          : 'oAuth::client.list.view',
        isViewAction: true,
    });

    const gridId = 'oAuth::client.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'oAuth::client.list.pagination');
    gridStateService.setExportActionId(gridId, 'oAuth::client.list.export');

    return clientService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: clientColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const clientNewResolver: ResolveFn<{
    oAuthGetScopes: OAuthScope[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const clientService = inject(ClientService);

    actionService.action({
        id          : 'oAuth::client.detail.new',
        isViewAction: true,
    });

    return clientService.getRelations();
};

export const clientEditResolver: ResolveFn<{
    object: OAuthClient;
    oAuthGetScopes: OAuthScope[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const clientService = inject(ClientService);

    actionService.action({
        id          : 'oAuth::client.detail.edit',
        isViewAction: true,
    });

    return clientService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
            constraint: {
                include: [
                    { association: 'applications' },
                ],
            },
        });
};
