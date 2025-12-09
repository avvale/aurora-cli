import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { IamTag, IamTenant } from '@apps/iam';
import { accountColumnsConfig, AccountService } from '@apps/iam/account';
import { TagService } from '@apps/iam/tag';
import { TenantService } from '@apps/iam/tenant';
import { messageColumnsConfig, MessageService } from '@apps/message/message';
import { MessageMessage } from '@apps/message/message.types';
import { OAuthScope } from '@apps/o-auth';
import { ScopeService } from '@apps/o-auth/scope';
import {
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    Operator,
    queryStatementHandler,
} from '@aurora';
import gql from 'graphql-tag';
import { first, forkJoin, map, Subject } from 'rxjs';
import {
    messageAccountsDialogGridId,
    messageAccountsGridId,
    messageSelectedAccountsScopePagination,
} from './message-detail.component';
import { messageMainGridListId } from './message-list.component';

export const messagePaginationResolver: ResolveFn<GridData<MessageMessage>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const messageService = inject(MessageService);

    actionService.action({
        id: 'message::message.list.view',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(
        messageMainGridListId,
        'message::message.list.pagination',
    );
    gridStateService.setExportActionId(
        messageMainGridListId,
        'message::message.list.export',
    );

    return messageService.pagination({
        query: queryStatementHandler({ columnsConfig: messageColumnsConfig() })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(
                    messageMainGridListId,
                ),
            )
            .setSort(gridStateService.getSort(messageMainGridListId))
            .setPage(gridStateService.getPage(messageMainGridListId))
            .setSearch(gridStateService.getSearchState(messageMainGridListId))
            .getQueryStatement(),
    });
};

export const messageNewResolver: ResolveFn<{
    iamGetTenants: IamTenant[];
    oAuthGetScopes: OAuthScope[];
    iamGetTags: IamTag[];
    iamGetSelectedTenantsAccount: IamTenant[];
    iamGetSelectedTenantsDialogAccount: IamTenant[];
    oAuthGetSelectedScopesAccount: OAuthScope[];
    oAuthGetSelectedScopesDialogAccount: OAuthScope[];
    iamGetSelectedTagsAccount: IamTag[];
    iamGetSelectedTagsDialogAccount: IamTag[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const messageService = inject(MessageService);
    const gridStateService = inject(GridStateService);

    actionService.action({
        id: 'message::message.detail.new',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(
        messageAccountsGridId,
        'message::message.detail.messageAccountsPagination',
    );
    gridStateService.setExportActionId(
        messageAccountsGridId,
        'message::message.detail.exportMessageAccounts',
    );

    gridStateService.setPaginationActionId(
        messageAccountsDialogGridId,
        'message::message.detail.messageAccountsDialogPagination',
    );
    gridStateService.setExportActionId(
        messageAccountsDialogGridId,
        'message::message.detail.exportMessageAccountsDialog',
    );

    const tenantsAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsGridId,
            'tenants',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsGridId,
              'tenants',
          )?.value as string[])
        : [];
    const scopesAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsGridId,
            'scopes',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsGridId,
              'scopes',
          )?.value as string[])
        : [];
    const tagsAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(messageAccountsGridId, 'tags')
            ?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsGridId,
              'tags',
          )?.value as string[])
        : [];

    const tenantsDialogAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsDialogGridId,
            'tenants',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsDialogGridId,
              'tenants',
          )?.value as string[])
        : [];
    const scopesDialogAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsDialogGridId,
            'scopes',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsDialogGridId,
              'scopes',
          )?.value as string[])
        : [];
    const tagsDialogAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsDialogGridId,
            'tags',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsDialogGridId,
              'tags',
          )?.value as string[])
        : [];

    return messageService
        .getRelations({
            constraintGetTenants: queryStatementHandler({
                queryStatement: {
                    include: [
                        {
                            association: 'parent',
                        },
                    ],
                },
            })
                .setPage({ pageIndex: 0, pageSize: 10 })
                .getQueryStatement(),
            queryGetSelectedTenants: {
                where: {
                    [Operator.or]: [
                        { id: tenantsAccount },
                        { id: tenantsDialogAccount },
                    ],
                },
            },
            queryGetSelectedScopes: {
                where: {
                    [Operator.or]: [
                        { code: scopesAccount },
                        { code: scopesDialogAccount },
                    ],
                },
            },
            queryGetSelectedTags: {
                where: {
                    [Operator.or]: [
                        { name: tagsAccount },
                        { name: tagsDialogAccount },
                    ],
                },
            },
        })
        .pipe(
            map((data) => ({
                iamGetTenants: data.iamGetTenants,
                oAuthGetScopes: data.oAuthGetScopes,
                iamGetTags: data.iamGetTags,
                iamGetSelectedTenantsAccount: data.iamGetSelectedTenants.filter(
                    (tenant) => tenantsAccount.includes(tenant.id),
                ),
                iamGetSelectedTenantsDialogAccount:
                    data.iamGetSelectedTenants.filter((tenant) =>
                        tenantsDialogAccount.includes(tenant.id),
                    ),
                oAuthGetSelectedScopesAccount:
                    data.oAuthGetSelectedScopes.filter((scope) =>
                        scopesAccount.includes(scope.code),
                    ),
                oAuthGetSelectedScopesDialogAccount:
                    data.oAuthGetSelectedScopes.filter((scope) =>
                        scopesDialogAccount.includes(scope.code),
                    ),
                iamGetSelectedTagsAccount: data.iamGetSelectedTags.filter(
                    (tag) => tagsAccount.includes(tag.name),
                ),
                iamGetSelectedTagsDialogAccount: data.iamGetSelectedTags.filter(
                    (tag) => tagsDialogAccount.includes(tag.name),
                ),
            })),
        );
};

export const messageEditResolver: ResolveFn<{
    object: MessageMessage;
    iamGetTenants: IamTenant[];
    iamGetSelectedTenantManagers: IamTenant[];
    iamGetSelectedTenantRecipients: IamTenant[];
    oAuthGetScopes: OAuthScope[];
    oAuthGetSelectedScopeRecipients: OAuthScope[];
    iamGetTags: IamTag[];
    iamGetSelectedTagRecipients: IamTag[];
    iamGetSelectedTenantsAccount: IamTenant[];
    iamGetSelectedTenantsDialogAccount: IamTenant[];
    oAuthGetSelectedScopesAccount: OAuthScope[];
    oAuthGetSelectedScopesDialogAccount: OAuthScope[];
    iamGetSelectedTagsAccount: IamTag[];
    iamGetSelectedTagsDialogAccount: IamTag[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const messageService = inject(MessageService);
    const tenantService = inject(TenantService);
    const scopeService = inject(ScopeService);
    const tagService = inject(TagService);
    const accountService = inject(AccountService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);

    actionService.action({
        id: 'message::message.detail.edit',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(
        messageAccountsGridId,
        'message::message.detail.messageAccountsPagination',
    );
    gridStateService.setExportActionId(
        messageAccountsGridId,
        'message::message.detail.exportMessageAccounts',
    );

    gridStateService.setPaginationActionId(
        messageAccountsDialogGridId,
        'message::message.detail.messageAccountsDialogPagination',
    );
    gridStateService.setExportActionId(
        messageAccountsDialogGridId,
        'message::message.detail.exportMessageAccountsDialog',
    );

    const tenantsAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsGridId,
            'tenants',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsGridId,
              'tenants',
          )?.value as string[])
        : [];
    const scopesAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsGridId,
            'scopes',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsGridId,
              'scopes',
          )?.value as string[])
        : [];
    const tagsAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(messageAccountsGridId, 'tags')
            ?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsGridId,
              'tags',
          )?.value as string[])
        : [];

    const tenantsDialogAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsDialogGridId,
            'tenants',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsDialogGridId,
              'tenants',
          )?.value as string[])
        : [];
    const scopesDialogAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsDialogGridId,
            'scopes',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsDialogGridId,
              'scopes',
          )?.value as string[])
        : [];
    const tagsDialogAccount = Array.isArray(
        gridFiltersStorageService.getColumnFilter(
            messageAccountsDialogGridId,
            'tags',
        )?.value,
    )
        ? (gridFiltersStorageService.getColumnFilter(
              messageAccountsDialogGridId,
              'tags',
          )?.value as string[])
        : [];

    const messageResponse = new Subject<{
        object: MessageMessage;
        iamGetTenants: IamTenant[];
        iamGetSelectedTenantManagers: IamTenant[];
        iamGetSelectedTenantRecipients: IamTenant[];
        oAuthGetScopes: OAuthScope[];
        oAuthGetSelectedScopeRecipients: OAuthScope[];
        iamGetTags: IamTag[];
        iamGetSelectedTagRecipients: IamTag[];
        iamGetSelectedTenantsAccount: IamTenant[];
        iamGetSelectedTenantsDialogAccount: IamTenant[];
        oAuthGetSelectedScopesAccount: OAuthScope[];
        oAuthGetSelectedScopesDialogAccount: OAuthScope[];
        iamGetSelectedTagsAccount: IamTag[];
        iamGetSelectedTagsDialogAccount: IamTag[];
    }>();

    messageService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
            constraintGetTenants: queryStatementHandler({
                queryStatement: {
                    include: [
                        {
                            association: 'parent',
                        },
                    ],
                },
            })
                .setPage({ pageIndex: 0, pageSize: 10 })
                .getQueryStatement(),
            queryGetSelectedTenants: {
                where: {
                    [Operator.or]: [
                        { id: tenantsAccount },
                        { id: tenantsDialogAccount },
                    ],
                },
            },
            queryGetSelectedScopes: {
                where: {
                    [Operator.or]: [
                        { code: scopesAccount },
                        { code: scopesDialogAccount },
                    ],
                },
            },
            queryGetSelectedTags: {
                where: {
                    [Operator.or]: [
                        { name: tagsAccount },
                        { name: tagsDialogAccount },
                    ],
                },
            },
        })
        .pipe(
            map((data) => ({
                object: data.object,
                iamGetTenants: data.iamGetTenants,
                oAuthGetScopes: data.oAuthGetScopes,
                iamGetTags: data.iamGetTags,
                // we filter the selected tenants, scopes and tags to separate
                // those that belong to accounts and those that belong to dialogs
                iamGetSelectedTenantsAccount: data.iamGetSelectedTenants.filter(
                    (tenant) => tenantsAccount.includes(tenant.id),
                ),
                iamGetSelectedTenantsDialogAccount:
                    data.iamGetSelectedTenants.filter((tenant) =>
                        tenantsDialogAccount.includes(tenant.id),
                    ),
                oAuthGetSelectedScopesAccount:
                    data.oAuthGetSelectedScopes.filter((scope) =>
                        scopesAccount.includes(scope.code),
                    ),
                oAuthGetSelectedScopesDialogAccount:
                    data.oAuthGetSelectedScopes.filter((scope) =>
                        scopesDialogAccount.includes(scope.code),
                    ),
                iamGetSelectedTagsAccount: data.iamGetSelectedTags.filter(
                    (tag) => tagsAccount.includes(tag.name),
                ),
                iamGetSelectedTagsDialogAccount: data.iamGetSelectedTags.filter(
                    (tag) => tagsDialogAccount.includes(tag.name),
                ),
            })),
        )
        .subscribe((dataFromFindByIdWithRelations) => {
            forkJoin({
                iamPaginateSelectedAccounts: accountService.pagination({
                    query: queryStatementHandler({
                        columnsConfig: accountColumnsConfig(),
                    })
                        .setColumFilters(
                            gridFiltersStorageService.getColumnFilterState(
                                messageAccountsGridId,
                            ),
                        )
                        .setSort(
                            gridStateService.getSort(messageAccountsGridId),
                        )
                        .setPage(
                            gridStateService.getPage(messageAccountsGridId),
                        )
                        .setSearch(
                            gridStateService.getSearchState(
                                messageAccountsGridId,
                            ),
                        )
                        .getQueryStatement(),
                    constraint: {
                        where: {
                            id: dataFromFindByIdWithRelations.object
                                .accountRecipientIds,
                        },
                        include: [
                            {
                                association: 'user',
                                required: true,
                            },
                            {
                                association: 'tenants',
                            },
                        ],
                        distinct: true,
                    },
                    scope: messageSelectedAccountsScopePagination,
                }),
                iamGetSelectedTenants: tenantService.get({
                    graphqlStatement: gql`
                        query IamGetTenants(
                            $query: QueryStatement
                            $constraint: QueryStatement
                        ) {
                            objects: iamGetWithTenantConstraintTenants(
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
                            id: Array.from(
                                new Set([
                                    ...dataFromFindByIdWithRelations.object
                                        .tenantIds,
                                    ...dataFromFindByIdWithRelations.object
                                        .tenantRecipientIds,
                                ]),
                            ),
                        },
                    },
                    constraint: {
                        include: [
                            {
                                association: 'parent',
                            },
                        ],
                    },
                }),
                oAuthGetSelectedScopeRecipients: scopeService.get({
                    graphqlStatement: gql`
                        query oAuthGetScopes(
                            $query: QueryStatement
                            $constraint: QueryStatement
                        ) {
                            objects: oAuthGetScopes(
                                query: $query
                                constraint: $constraint
                            ) {
                                id
                                code
                                name
                            }
                        }
                    `,
                    query: {
                        where: {
                            code: dataFromFindByIdWithRelations.object
                                .scopeRecipients,
                        },
                    },
                }),
                iamGetSelectedTagRecipients: tagService.get({
                    graphqlStatement: gql`
                        query IamGetTags(
                            $query: QueryStatement
                            $constraint: QueryStatement
                        ) {
                            objects: iamGetTags(
                                query: $query
                                constraint: $constraint
                            ) {
                                id
                                name
                            }
                        }
                    `,
                    query: {
                        where: {
                            name: dataFromFindByIdWithRelations.object
                                .tagRecipients,
                        },
                    },
                }),
            })
                .pipe(
                    first(),
                    map((data) => ({
                        // from the same call to obtain tenants, we separate
                        // the tenant recipients from the tenant managers
                        iamGetSelectedTenantManagers:
                            data.iamGetSelectedTenants.objects.filter(
                                (object) =>
                                    dataFromFindByIdWithRelations.object.tenantIds.includes(
                                        object.id,
                                    ),
                            ),
                        iamGetSelectedTenantRecipients:
                            data.iamGetSelectedTenants.objects.filter(
                                (object) =>
                                    dataFromFindByIdWithRelations.object.tenantRecipientIds.includes(
                                        object.id,
                                    ),
                            ),
                        // This data is not being used, but I am leaving it in case it is needed in the future
                        // to implement an async-mat-select-search
                        oAuthGetSelectedScopeRecipients:
                            data.oAuthGetSelectedScopeRecipients.objects,
                        iamGetSelectedTagRecipients:
                            data.iamGetSelectedTagRecipients.objects,
                    })),
                )
                .subscribe((dataFromForkJoin) => {
                    messageResponse.next({
                        ...dataFromForkJoin,
                        ...dataFromFindByIdWithRelations,
                    });
                });
        });

    return messageResponse;
};
