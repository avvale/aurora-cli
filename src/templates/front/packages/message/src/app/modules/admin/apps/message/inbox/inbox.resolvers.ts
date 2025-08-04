import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MessageInbox } from '@apps/message';
import { inboxColumnsConfig, InboxService } from '@apps/message/inbox';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, queryStatementHandler } from '@aurora';

export const inboxPaginationResolver: ResolveFn<GridData<MessageInbox>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'message::inbox.list.view',
        isViewAction: true,
    });

    const gridId = 'message::inbox.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'message::inbox.list.pagination');
    gridStateService.setExportActionId(gridId, 'message::inbox.list.export');

    return inboxService.pagination({
        query: queryStatementHandler({ columnsConfig: inboxColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const inboxNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'message::inbox.detail.new',
        isViewAction: true,
    });
};

export const inboxEditResolver: ResolveFn<{
    object: MessageInbox;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'message::inbox.detail.edit',
        isViewAction: true,
    });

    return inboxService
        .findById({
            id: route.paramMap.get('id'),
        });
};
