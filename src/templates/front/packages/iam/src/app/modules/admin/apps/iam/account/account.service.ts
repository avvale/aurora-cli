import { IamAccount, IamCreateAccount, IamRole, IamTenant, IamUpdateAccountById, IamUpdateAccounts } from '../iam.types';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './account.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { RoleService } from '../role/role.service';
import { TenantService } from '../tenant/tenant.service';
import { ClientService } from '../../o-auth/client/client.service';
import { OAuthClient } from '../../o-auth/o-auth.types';

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
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
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
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
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
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.accountsSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreateAccount;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdateAccountById;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdateAccounts;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    // ---- customizations ----
    getRelations(
        {
            queryGetClients = {},
            constraintGetClients = {},
            headers = {},
        }: {
            queryGetClients?: QueryStatement;
            constraintGetClients?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
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
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            queryGetClients?: QueryStatement;
            constraintGetClients?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.accountSubject$.next(data.object);
                    this.tenantService.tenantsSubject$.next(data.iamGetTenants);
                    this.roleService.rolesSubject$.next(data.iamGetRoles);
                    this.clientService.clientsSubject$.next(data.oAuthGetClients);
                }),
            );
    }
}