import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { accountColumnsConfig, AccountService } from '@apps/iam/account';
import { IamAccount } from '@apps/iam/iam.types';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import {
    ActionService,
    GridData,
    GridFiltersStorageService,
    GridStateService,
    queryStatementHandler,
} from '@aurora';
import { IamRole, IamTag, IamTenant } from '../iam.types';

export const accountPaginationResolver: ResolveFn<{
    pagination: GridData<IamAccount>;
    iamGetTenants: IamTenant[];
    iamGetSelectedTenants: IamTenant[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const accountService = inject(AccountService);

    actionService.action({
        id: 'iam::account.list.view',
        isViewAction: true,
    });

    const gridId = 'iam::account.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'iam::account.list.pagination',
    );
    gridStateService.setExportActionId(gridId, 'iam::account.list.export');

    return accountService.paginationWithRelations({
        query: queryStatementHandler({ columnsConfig: accountColumnsConfig() })
            .setColumFilters(
                gridFiltersStorageService.getColumnFilterState(gridId),
            )
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
        constraint: {
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
        queryGetTenants: queryStatementHandler()
            .setPage({ pageIndex: 0, pageSize: 10 })
            .getQueryStatement(),
        queryGetSelectedTenants: {
            where: {
                id:
                    gridFiltersStorageService.getColumnFilter(gridId, 'tenants')
                        ?.value || [],
            },
        },
        queryGetScopes: queryStatementHandler()
            .setPage({ pageIndex: 0, pageSize: 10 })
            .getQueryStatement(),
        queryGetSelectedScopes: {
            where: {
                code:
                    gridFiltersStorageService.getColumnFilter(gridId, 'scopes')
                        ?.value || [],
            },
        },
        queryGetTags: queryStatementHandler()
            .setPage({ pageIndex: 0, pageSize: 10 })
            .getQueryStatement(),
        queryGetSelectedTags: {
            where: {
                name:
                    gridFiltersStorageService.getColumnFilter(gridId, 'tags')
                        ?.value || [],
            },
        },
    });
};

export const accountNewResolver: ResolveFn<{
    iamGetTenants: IamTenant[];
    iamGetRoles: IamRole[];
    iamGetTags: IamTag[];
    oAuthGetClients: OAuthClient[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const accountService = inject(AccountService);
    const actionService = inject(ActionService);

    actionService.action({
        id: 'iam::account.detail.new',
        isViewAction: true,
    });

    return accountService.getRelations({
        queryGetClients: {
            where: {
                isActive: true,
            },
        },
    });
};

export const accountEditResolver: ResolveFn<{
    object: IamAccount;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const accountService = inject(AccountService);
    const actionService = inject(ActionService);

    actionService.action({
        id: 'iam::account.detail.edit',
        isViewAction: true,
    });

    return accountService.findByIdWithRelations({
        id: route.paramMap.get('id'),
        constraint: {
            include: [
                {
                    association: 'client',
                },
                {
                    association: 'user',
                },
                {
                    association: 'roles',
                },
                {
                    association: 'tenants',
                },
            ],
        },
    });
};
