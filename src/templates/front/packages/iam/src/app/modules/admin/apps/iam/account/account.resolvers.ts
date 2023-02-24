import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { IamAccount, IamRole, IamTenant } from '../iam.types';
import { accountColumnsConfig } from './account.columns-config';
import { AccountService } from './account.service';
import { OAuthClient } from '../../o-auth/o-auth.types';

@Injectable({
    providedIn: 'root',
})
export class AccountPaginationResolver implements Resolve<GridData<IamAccount>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly accountService: AccountService,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<GridData<IamAccount>>
    {
        this.actionService.action({
            id          : 'iam::account.list.view',
            isViewAction: true,
        });
        const gridId = 'iam::account.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'iam::account.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'iam::account.list.export');
        return this.accountService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: accountColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(gridId))
                .setSort(this.gridStateService.getSort(gridId))
                .setPage(this.gridStateService.getPage(gridId))
                .setSearch(this.gridStateService.getSearchState(gridId))
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class AccountNewResolver implements Resolve<{
    iamGetTenants: IamTenant[];
    iamGetRoles: IamRole[];
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly accountService: AccountService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
        iamGetTenants: IamTenant[];
        iamGetRoles: IamRole[];
        oAuthGetClients: OAuthClient[];
    }>
    {
        this.actionService.action({
            id          : 'iam::account.detail.new',
            isViewAction: true,
        });
        return this.accountService
            .getRelations({
                queryGetClients: {
                    where: {
                        isActive: true,
                    },
                },
            });
    }
}

@Injectable({
    providedIn: 'root',
})
export class AccountEditResolver implements Resolve<{
    object: IamAccount;
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly accountService: AccountService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
        object: IamAccount;
    }>
    {
        this.actionService.action({
            id          : 'iam::account.detail.edit',
            isViewAction: true,
        });
        return this.accountService.findByIdWithRelations({
            id        : route.paramMap.get('id'),
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
    }
}
