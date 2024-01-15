import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CommonResource } from '@apps/common/common.types';
import { resourceColumnsConfig, ResourceService } from '@apps/common/resource';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const resourcePaginationResolver: ResolveFn<GridData<CommonResource>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const resourceService = inject(ResourceService);

    actionService.action({
        id          : 'common::resource.list.view',
        isViewAction: true,
    });

    const gridId = 'common::resource.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'common::resource.list.pagination');
    gridStateService.setExportActionId(gridId, 'common::resource.list.export');

    return resourceService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: resourceColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const resourceNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'common::resource.detail.new',
        isViewAction: true,
    });
};

export const resourceEditResolver: ResolveFn<{
    object: CommonResource;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const resourceService = inject(ResourceService);

    actionService.action({
        id          : 'common::resource.detail.edit',
        isViewAction: true,
    });

    return resourceService
        .findById({
            id: route.paramMap.get('id'),
        });
};
