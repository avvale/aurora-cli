import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTag } from '@apps/iam/iam.types';
import { tagColumnsConfig, TagService } from '@apps/iam/tag';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const tagPaginationResolver: ResolveFn<GridData<IamTag>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const tagService = inject(TagService);

    actionService.action({
        id          : 'iam::tag.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::tag.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'iam::tag.list.pagination');
    gridStateService.setExportActionId(gridId, 'iam::tag.list.export');

    return tagService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: tagColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const tagNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'iam::tag.detail.new',
        isViewAction: true,
    });
};

export const tagEditResolver: ResolveFn<{
    object: IamTag;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const tagService = inject(TagService);

    actionService.action({
        id          : 'iam::tag.detail.edit',
        isViewAction: true,
    });

    return tagService
        .findById({
            id: route.paramMap.get('id'),
        });
};
