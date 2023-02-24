import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { IamAccount, IamCreateAccount, IamRole, IamTenant, IamUpdateAccountById, IamUpdateAccounts } from '../iam.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, getRelations, findByIdWithRelationsQuery } from './account.graphql';

// ---- customizations ----
import { RoleService } from '../role/role.service';
import { TenantService } from '../tenant/tenant.service';
import { OAuthClient } from '../../o-auth/o-auth.types';
import { ClientService } from '../../o-auth/client/client.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService
{
    paginationSubject$: BehaviorSubject<GridData<IamAccount> | null> = new BehaviorSubject(null);
    accountSubject$: BehaviorSubject<IamAccount | null> = new BehaviorSubject(null);
    accountsSubject$: BehaviorSubject<IamAccount[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly roleService: RoleService,
        private readonly tenantService: TenantService,
        private readonly clientService: ClientService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<IamAccount>>
    {
        return this.paginationSubject$.asObservable();
    }

    get account$(): Observable<IamAccount>
    {
        return this.accountSubject$.asObservable();
    }

    get accounts$(): Observable<IamAccount[]>
    {
        return this.accountsSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<GridData<IamAccount>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamAccount>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<IamAccount>; };}, GridData<IamAccount>>(result => result.data.pagination),
                tap((pagination: GridData<IamAccount>) => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        object: IamAccount;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamAccount;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamAccount;
                    };
                },
                {
                    object: IamAccount;
                }>(result => result.data),
                tap((data: {
                    object: IamAccount;
                }) =>
                {
                    this.accountSubject$.next(data.object);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        object: IamAccount;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamAccount;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamAccount;
                    };
                },
                {
                    object: IamAccount;
                }>(result => result.data),
                tap((data: {
                    object: IamAccount;
                }) =>
                {
                    this.accountSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        objects: IamAccount[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamAccount[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        objects: IamAccount[];
                    };
                },
                {
                    objects: IamAccount[];
                }>(result => result.data),
                tap((data: {
                    objects: IamAccount[];
                }) =>
                {
                    this.accountsSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreateAccount;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdateAccountById;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdateAccounts;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
            });
    }

    deleteById<T>(
        id: string,
        graphqlStatement = deleteByIdMutation,
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: { id },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: { query, constraint },
            });
    }

    // ---- customizations ----
    getRelations(
        {
            queryGetClients = {},
            constraintGetClients = {},
        }: {
            queryGetClients?: QueryStatement;
            constraintGetClients?: QueryStatement;
        } = {},
    ): Observable<{
        iamGetTenants: IamTenant[];
        iamGetRoles: IamRole[];
        oAuthGetClients: OAuthClient[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetTenants: IamTenant[];
                iamGetRoles: IamRole[];
                oAuthGetClients: OAuthClient[];
            }>({
                query    : getRelations,
                variables: {
                    queryGetClients,
                    constraintGetClients,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: {
                    iamGetTenants: IamTenant[];
                    iamGetRoles: IamRole[];
                    oAuthGetClients: OAuthClient[];
                };},
                {
                    iamGetTenants: IamTenant[];
                    iamGetRoles: IamRole[];
                    oAuthGetClients: OAuthClient[];
                }>(result => result.data),
                tap((data: {
                    iamGetTenants: IamTenant[];
                    iamGetRoles: IamRole[];
                    oAuthGetClients: OAuthClient[];
                }) =>
                {
                    this.tenantService.tenantsSubject$.next(data.iamGetTenants);
                    this.roleService.rolesSubject$.next(data.iamGetRoles);
                    this.clientService.clientsSubject$.next(data.oAuthGetClients);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            queryGetClients = {},
            constraintGetClients = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            queryGetClients?: QueryStatement;
            constraintGetClients?: QueryStatement;
        } = {},
    ): Observable<{
        object: IamAccount;
        iamGetTenants: IamTenant[];
        iamGetRoles: IamRole[];
        oAuthGetClients: OAuthClient[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamAccount;
                iamGetTenants: IamTenant[];
                iamGetRoles: IamRole[];
                oAuthGetClients: OAuthClient[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryGetClients,
                    constraintGetClients,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamAccount;
                        iamGetTenants: IamTenant[];
                        iamGetRoles: IamRole[];
                        oAuthGetClients: OAuthClient[];
                    };
                },
                {
                    object: IamAccount;
                    iamGetTenants: IamTenant[];
                    iamGetRoles: IamRole[];
                    oAuthGetClients: OAuthClient[];
                }>(result => result.data),
                tap((data: {
                    object: IamAccount;
                    iamGetTenants: IamTenant[];
                    iamGetRoles: IamRole[];
                    oAuthGetClients: OAuthClient[];
                }) =>
                {
                    this.accountSubject$.next(data.object);
                    this.tenantService.tenantsSubject$.next(data.iamGetTenants);
                    this.roleService.rolesSubject$.next(data.iamGetRoles);
                    this.clientService.clientsSubject$.next(data.oAuthGetClients);
                }),
            );
    }
}
