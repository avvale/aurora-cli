import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { SupportComment } from '@apps/support';
import { commentColumnsConfig, CommentService } from '@apps/support/comment';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';

export const commentPaginationResolver: ResolveFn<GridData<SupportComment>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const commentService = inject(CommentService);

    actionService.action({
        id: 'support::comment.list.view',
        isViewAction: true,
    });

    const gridId = 'support::comment.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'support::comment.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'support::comment.list.export');

    return commentService.pagination({
        query: queryStatementHandler({ columnsConfig: commentColumnsConfig() })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const commentNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'support::comment.detail.new',
        isViewAction: true,
    });
};

export const commentEditResolver: ResolveFn<{
    object: SupportComment;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const commentService = inject(CommentService);

    actionService.action({
        id: 'support::comment.detail.edit',
        isViewAction: true,
    });

    return commentService.findById({
        id: route.paramMap.get('id'),
    });
};
