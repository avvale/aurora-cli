import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MessageService } from '@apps/message';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { of } from 'rxjs';
import { InboxService, inboxColumnsConfig } from '../inbox';
import { MessageInbox } from '../message.types';
import { messageCenterExportListAction, messageCenterMainListId, messageCenterPaginationListAction } from './list/message-center-list.component';

export const messageCenterPaginationResolver: ResolveFn<GridData<MessageInbox>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'message::messageCenter.list.view',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(messageCenterMainListId, messageCenterPaginationListAction);
    gridStateService.setExportActionId(messageCenterMainListId, messageCenterExportListAction);

    return inboxService.paginateCustomerCenterMessagesInbox({
        query: QueryStatementHandler
            .init({ columnsConfig: inboxColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(messageCenterMainListId))
            .setSort(gridStateService.getSort(messageCenterMainListId, { active: 'sort', direction: 'desc' }))
            .setPage(gridStateService.getPage(messageCenterMainListId))
            .setSearch(gridStateService.getSearchState(messageCenterMainListId))
            .getQueryStatement(),
    });
};

export const messageCenterShowResolver: ResolveFn<{
    object: MessageInbox;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const inboxService = inject(InboxService);

    return inboxService
        .findCustomerMessageInbox({
            query: {
                where: {
                    id: route.paramMap.get('id'),
                },
            },
        });
};

export const messageCenterShowEmptyResolver: ResolveFn<boolean> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const messageService = inject(MessageService);

    messageService.resetSelectedMessage();

    return of(true);
};
