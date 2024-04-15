import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTag, IamTenant } from '@apps/iam';
import { messageColumnsConfig, MessageService } from '@apps/message/message';
import { MessageMessage } from '@apps/message/message.types';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, IamService, QueryStatementHandler } from '@aurora';
import { messageAccountsDialogGridId, messageAccountsGridId } from './message-detail.component';
import { Subject, first, map } from 'rxjs';
import { messageMainGridListId } from './message-list.component';

export const messagePaginationResolver: ResolveFn<GridData<MessageMessage>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const messageService = inject(MessageService);

    actionService.action({
        id          : 'message::message.list.view',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(messageMainGridListId, 'message::message.list.pagination');
    gridStateService.setExportActionId(messageMainGridListId, 'message::message.list.export');

    return messageService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: messageColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(messageMainGridListId))
            .setSort(gridStateService.getSort(messageMainGridListId))
            .setPage(gridStateService.getPage(messageMainGridListId))
            .setSearch(gridStateService.getSearchState(messageMainGridListId))
            .getQueryStatement(),
    });
};

export const messageNewResolver: ResolveFn<{
    iamGetTags: IamTag[];
    iamGetTenants: IamTenant[];
    oAuthFindClientById: OAuthClient;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const messageService = inject(MessageService);
    const iamService = inject(IamService);
    const gridStateService = inject(GridStateService);

    actionService.action({
        id          : 'message::message.detail.new',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(messageAccountsGridId, 'message::message.detail.messageAccountsPagination');
    gridStateService.setExportActionId(messageAccountsGridId, 'message::message.detail.exportMessageAccounts');

    gridStateService.setPaginationActionId(messageAccountsDialogGridId, 'message::message.detail.accountsPagination');
    gridStateService.setExportActionId(messageAccountsDialogGridId, 'message::message.detail.exportAccounts');

    return messageService.getRelations({
        clientId         : iamService.me.clientId,
        constraintTenants: {
            where: {
                id: iamService.me.dTenants,
            },
        },
        constraintPaginateSelectedAccounts: {
            where: {
                id: [],
            },
            include: [
                {
                    association: 'user',
                    required   : true,

                },
            ],
        },
        constraintPaginateAccounts: {
            include: [
                {
                    association: 'user',
                    required   : true,
                },
            ],
        },
    });
};

export const messageEditResolver: ResolveFn<{
    object: MessageMessage;
    iamGetTags: IamTag[];
    iamGetTenants: IamTenant[];
    oAuthFindClientById: OAuthClient;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const messageService = inject(MessageService);
    const iamService = inject(IamService);

    actionService.action({
        id          : 'message::message.detail.edit',
        isViewAction: true,
    });

    const messageResponse = new Subject<{
        object: MessageMessage;
        iamGetTags: IamTag[];
        iamGetTenants: IamTenant[];
        oAuthFindClientById: OAuthClient;
     }>();

    messageService
        .findById({
            id: route.paramMap.get('id'),
        })
        .pipe(
            map(response => response.object),
            first(),
        )
        .subscribe(message =>
        {
            messageService.getRelations({
                clientId         : iamService.me.clientId,
                constraintTenants: {
                    where: {
                        id: iamService.me.dTenants,
                    },
                },
                constraintPaginateSelectedAccounts: {
                    where: {
                        id: message.accountRecipientIds,
                    },
                    include: [
                        {
                            association: 'user',
                            required   : true,
                        },
                    ],
                },
                constraintPaginateAccounts: {
                    include: [
                        {
                            association: 'user',
                            required   : true,
                        },
                    ],
                },
            })
                .pipe(
                    first(),
                )
                .subscribe(relations =>
                {
                    messageResponse.next({
                        ...relations,
                        object: message,
                    });
                });

        });

    return messageResponse;
};
