import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { applicationColumnsConfig, ApplicationService } from '@apps/o-auth/application';
import { OAuthApplication } from '@apps/o-auth/o-auth.types';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationPaginationResolver: ResolveFn<GridData<OAuthApplication>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'oAuth::application.list.view',
        isViewAction: true,
    });

    const gridId = 'oAuth::application.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'oAuth::application.list.pagination');
    gridStateService.setExportActionId(gridId, 'oAuth::application.list.export');

    return applicationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'oAuth::application.detail.new',
        isViewAction: true,
    });
};

export const applicationEditResolver: ResolveFn<{
    object: OAuthApplication;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'oAuth::application.detail.edit',
        isViewAction: true,
    });

    return applicationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
