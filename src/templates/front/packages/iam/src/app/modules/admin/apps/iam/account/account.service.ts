import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from '@apps/iam/account';
import { IamAccount, IamCreateAccount, IamUpdateAccountById, IamUpdateAccounts } from '@apps/iam/iam.types';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { GraphQLHeaders, GraphQLService, GridData, QueryStatement, parseGqlFields } from '@aurora';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { IamRole, IamTag, IamTenant } from '../iam.types';
import { RoleService } from '../role';
import { TagService } from '../tag';
import { TenantService } from '../tenant/tenant.service';
import { findByIdWithRelationsQuery, getRelations } from './account.graphql';

@Injectable({
    providedIn: 'root',
})
export class AccountService
{
    paginationSubject$: BehaviorSubject<GridData<IamAccount> | null> = new BehaviorSubject(null);
    accountSubject$: BehaviorSubject<IamAccount | null> = new BehaviorSubject(null);
    accountsSubject$: BehaviorSubject<IamAccount[] | null> = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: { [key: string]: BehaviorSubject<GridData<IamAccount> | null>; } = {};
    accountScoped: { [key: string]: BehaviorSubject<IamAccount | null>; } = {};
    accountsScoped: { [key: string]: BehaviorSubject<IamAccount[] | null>; } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly tenantService: TenantService,
        private readonly roleService: RoleService,
        private readonly tagService: TagService,
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

    // allows to store different types of pagination under different scopes
    // this allows us to have multiple observables with different streams of
    // pagination data.
    setScopePagination(scope: string, pagination: GridData<IamAccount>): void
    {
        if (this.paginationScoped[scope])
        {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamAccount>>
    {
        if (this.paginationScoped[scope]) return this.paginationScoped[scope].asObservable();
        return null;
    }

    setScopeAccount(scope: string, object: IamAccount): void
    {
        if (this.accountScoped[scope])
        {
            this.accountScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.accountScoped[scope] = new BehaviorSubject(object);
    }

    getScopeAccount(scope: string): Observable<IamAccount>
    {
        if (this.accountScoped[scope]) return this.accountScoped[scope].asObservable();
        return null;
    }

    setScopeAccounts(scope: string, objects: IamAccount[]): void
    {
        if (this.accountsScoped[scope])
        {
            this.accountsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.accountsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeAccounts(scope: string): Observable<IamAccount[]>
    {
        if (this.accountsScoped[scope]) return this.accountsScoped[scope].asObservable();
        return null;
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(pagination => scope ? this.setScopePagination(scope, pagination) : this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(data => scope ? this.setScopeAccount(scope, data.object) : this.accountSubject$.next(data.object)),
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
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            queryGetClients?: QueryStatement;
            constraintGetClients?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<{
        object: IamAccount;
        iamGetTenants: IamTenant[];
        iamGetRoles: IamRole[];
        iamGetTags: IamTag[];
        oAuthGetClients: OAuthClient[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamAccount;
                iamGetTenants: IamTenant[];
                iamGetRoles: IamRole[];
                iamGetTags: IamTag[];
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
                    if (scope)
                    {
                        this.setScopeAccount(scope, data.object);
                    }
                    else
                    {
                        this.accountSubject$.next(data.object);
                    }
                    this.tenantService.tenantsSubject$.next(data.iamGetTenants);
                    this.roleService.rolesSubject$.next(data.iamGetRoles);
                    this.tagService.tagsSubject$.next(data.iamGetTags);
                    this.clientService.clientsSubject$.next(data.oAuthGetClients);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(data => scope ? this.setScopeAccount(scope, data.object) : this.accountSubject$.next(data.object)),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(data => scope ? this.setScopeAccounts(scope, data.objects) : this.accountsSubject$.next(data.objects)),
            );
    }

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
        iamGetTags: IamTag[];
        oAuthGetClients: OAuthClient[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetTenants: IamTenant[];
                iamGetRoles: IamRole[];
                iamGetTags: IamTag[];
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
                    this.tagService.tagsSubject$.next(data.iamGetTags);
                    this.clientService.clientsSubject$.next(data.oAuthGetClients);
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
}
