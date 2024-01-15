import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamRole } from '@apps/iam/iam.types';
import { OAuthScope } from '@apps/o-auth/o-auth.types';
import { scopeColumnsConfig, ScopeService } from '@apps/o-auth/scope';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const scopePaginationResolver: ResolveFn<GridData<OAuthScope>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const scopeService = inject(ScopeService);

    actionService.action({
        id          : 'oAuth::scope.list.view',
        isViewAction: true,
    });

    const gridId = 'oAuth::scope.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'oAuth::scope.list.pagination');
    gridStateService.setExportActionId(gridId, 'oAuth::scope.list.export');

    return scopeService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: scopeColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const scopeNewResolver: ResolveFn<{
    iamGetRoles: IamRole[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const scopeService = inject(ScopeService);

    actionService.action({
        id          : 'oAuth::scope.detail.new',
        isViewAction: true,
    });

    return scopeService.getRelations();
};

export const scopeEditResolver: ResolveFn<{
    object: OAuthScope;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const scopeService = inject(ScopeService);

    actionService.action({
        id          : 'oAuth::scope.detail.edit',
        isViewAction: true,
    });

    return scopeService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
