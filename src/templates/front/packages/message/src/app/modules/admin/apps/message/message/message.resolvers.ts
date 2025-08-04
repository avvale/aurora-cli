import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTag, IamTenant } from '@apps/iam';
import { accountColumnsConfig, AccountService } from '@apps/iam/account';
import { TenantService } from '@apps/iam/tenant';
import { messageColumnsConfig, MessageService } from '@apps/message/message';
import { MessageMessage } from '@apps/message/message.types';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, IamService, queryStatementHandler } from '@aurora';
import gql from 'graphql-tag';
import { first, forkJoin, map, Subject } from 'rxjs';
import { messageAccountsDialogGridId, messageAccountsGridId, messageSelectedAccountsScopePagination } from './message-detail.component';
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
        query: queryStatementHandler({ columnsConfig: messageColumnsConfig })
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
        constraintGetTenants: queryStatementHandler(
            {
                queryStatement: {
                    where: {
                        id: iamService.me.dTenants,
                    },
                    include: [
                        {
                            association: 'parent',
                        },
                    ],
                },
            },
        )
            .setPage({ pageIndex: 0, pageSize: 10 })
            .getQueryStatement(),
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
    const tenantService = inject(TenantService);
    const accountService = inject(AccountService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);

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
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
            clientId         : iamService.me.clientId,
            constraintGetTenants: queryStatementHandler(
                {
                    queryStatement: {
                        where: {
                            id: iamService.me.dTenants,
                        },
                        include: [
                            {
                                association: 'parent',
                            },
                        ],
                    },
                },
            )
                .setPage({ pageIndex: 0, pageSize: 10 })
                .getQueryStatement(),
        })
        .subscribe(dataFromFindByIdWithRelations =>
        {
            forkJoin({
                iamPaginateSelectedAccounts: accountService
                    .pagination({
                        query: queryStatementHandler({ columnsConfig: accountColumnsConfig })
                            .setColumFilters(gridFiltersStorageService.getColumnFilterState(messageAccountsGridId))
                            .setSort(gridStateService.getSort(messageAccountsGridId))
                            .setPage(gridStateService.getPage(messageAccountsGridId))
                            .setSearch(gridStateService.getSearchState(messageAccountsGridId))
                            .getQueryStatement(),
                        constraint: {
                            where: {
                                id: dataFromFindByIdWithRelations.object.accountRecipientIds
                            },
                        },
                        scope: messageSelectedAccountsScopePagination,
                    }),
                messageGetTenantRecipients: tenantService
                    .get({
                        graphqlStatement:  gql`
                            query IamGetTenants (
                                $query: QueryStatement
                                $constraint: QueryStatement
                            ) {
                                objects: iamGetTenants (
                                    query: $query
                                    constraint: $constraint
                                ) {
                                    id
                                    name
                                    parentId
                                    parent {
                                        id
                                        name
                                    }
                                    isActive
                                }
                            }
                        `,
                        query: {
                            where: {
                                id: Array.from(new Set([
                                    ...dataFromFindByIdWithRelations.object.tenantIds,
                                    ...dataFromFindByIdWithRelations.object.tenantRecipientIds,
                                ])),
                            },
                        },
                        constraint: {
                            where: {
                                id: iamService.me.dTenants,
                            },
                            include: [
                                {
                                    association: 'parent',
                                },
                            ],
                        },
                    }),
            })
                .pipe(
                    first(),
                    map(data  => ({
                        messageGetTenantSenders: data.messageGetTenantRecipients
                            .objects
                            .filter(object => dataFromFindByIdWithRelations.object.tenantIds.includes(object.id)),
                        messageGetTenantRecipients: data.messageGetTenantRecipients
                            .objects
                            .filter(object => dataFromFindByIdWithRelations.object.tenantRecipientIds.includes(object.id)),
                    })),
                )
                .subscribe(dataFromForkJoin =>
                {
                    messageResponse.next({
                        ...dataFromForkJoin,
                        ...dataFromFindByIdWithRelations,
                    });
                });

            /* messageService.getRelations({
                clientId         : iamService.me.clientId,
                constraintPaginateTenants: {
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
                }); */

        });

    return messageResponse;
};
