import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from '@apps/iam/account';
import { IamAccount, IamCreateAccount, IamUpdateAccountById, IamUpdateAccounts } from '@apps/iam/iam.types';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient, OAuthScope } from '@apps/o-auth/o-auth.types';
import { GraphQLHeaders, GraphQLService, GridData, QueryStatement, parseGqlFields } from '@aurora';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { IamRole, IamTag, IamTenant } from '../iam.types';
import { RoleService } from '../role';
import { TagService } from '../tag';
import { TenantService } from '../tenant/tenant.service';
import { checkPasswordMeAccountQuery, checkUniqueEmailAccountQuery, checkUniqueUsernameAccountQuery, findByIdWithRelationsQuery, getRelations, insertMutation, paginateWithTenantConstraintAccountsQuery, paginationWithRelationsQuery, updateMeAccountMutation } from './account.graphql';
import { ScopeService } from '@apps/o-auth/scope';

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
        private readonly scopeService: ScopeService,
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

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
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
        if (!this.paginationScoped[scope]) this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
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
        if (!this.accountScoped[scope]) this.accountScoped[scope] = new BehaviorSubject(null);
        return this.accountScoped[scope].asObservable();
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
        if (!this.accountsScoped[scope]) this.accountsScoped[scope] = new BehaviorSubject(null);
        return this.accountsScoped[scope].asObservable();
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

    paginationWithRelations(
        {
            graphqlStatement = paginationWithRelationsQuery,
            query = {},
            constraint = {},
            queryGetTenants = {},
            constraintGetTenants = {},
            queryGetSelectedTenants = {},
            constraintGetSelectedTenants = {},
            queryGetScopes = {},
            constraintGetScopes = {},
            queryGetSelectedScopes = {},
            constraintGetSelectedScopes = {},
            queryGetTags = {},
            constraintGetTags = {},
            queryGetSelectedTags = {},
            constraintGetSelectedTags = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            queryGetTenants?: QueryStatement;
            constraintGetTenants?: QueryStatement;
            queryGetSelectedTenants?: QueryStatement;
            constraintGetSelectedTenants?: QueryStatement;
            queryGetScopes?: QueryStatement;
            constraintGetScopes?: QueryStatement;
            queryGetSelectedScopes?: QueryStatement;
            constraintGetSelectedScopes?: QueryStatement;
            queryGetTags?: QueryStatement;
            constraintGetTags?: QueryStatement;
            queryGetSelectedTags?: QueryStatement;
            constraintGetSelectedTags?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<{
        pagination: GridData<IamAccount>;
        iamGetTenants: IamTenant[];
        iamGetSelectedTenants: IamTenant[];
        oAuthGetScopes: OAuthScope[];
        oAuthGetSelectedScopes: OAuthScope[];
        iamGetTags: IamTag[];
        iamGetSelectedTags: IamTag[];
    }>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<IamAccount>;
                iamGetTenants: IamTenant[];
                iamGetSelectedTenants: IamTenant[];
                oAuthGetScopes: OAuthScope[];
                oAuthGetSelectedScopes: OAuthScope[];
                iamGetTags: IamTag[];
                iamGetSelectedTags: IamTag[];
            }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                    queryGetTenants,
                    constraintGetTenants,
                    queryGetSelectedTenants,
                    constraintGetSelectedTenants,
                    queryGetScopes,
                    constraintGetScopes,
                    queryGetSelectedScopes,
                    constraintGetSelectedScopes,
                    queryGetTags,
                    constraintGetTags,
                    queryGetSelectedTags,
                    constraintGetSelectedTags,
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
                        this.setScopePagination(scope, data.pagination);
                    }
                    else
                    {
                        this.paginationSubject$.next(data.pagination);
                    }
                    // select tenants are obtained by activatedRoute.snapshot.data.data.iamGetSelectedTenants
                    this.tenantService.tenantsSubject$.next(data.iamGetTenants);
                    // select tenants are obtained by activatedRoute.snapshot.data.data.oAuthGetSelectedScopes
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                    // select tenants are obtained by activatedRoute.snapshot.data.data.iamGetSelectedTags
                    this.tagService.tagsSubject$.next(data.iamGetTags);
                }),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = null,
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
            headers = {},
            queryGetClients = {},
            constraintGetClients = {},
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

    insert<T>(
        {
            graphqlStatement = insertMutation,
            objects = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            objects?: IamCreateAccount[];
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: objects,
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
            id = null,
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

    // Queries additionalApis
    checkPasswordMeAccount(
        {
            graphqlStatement = checkPasswordMeAccountQuery,
            password = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            password?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<boolean>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamCheckPasswordMeAccount: boolean;
            }>({
                query    : graphqlStatement,
                variables: {
                    password,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.iamCheckPasswordMeAccount),
            );
    }

    checkUniqueUsernameAccount(
        {
            graphqlStatement = checkUniqueUsernameAccountQuery,
            username = null,
            avoidUsernames = [],
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            username?: string;
            avoidUsernames?: string[];
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<boolean>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamCheckUniqueUsernameAccount: boolean;
            }>({
                query    : graphqlStatement,
                variables: {
                    username,
                    avoidUsernames,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.iamCheckUniqueUsernameAccount),
            );
    }

    checkUniqueEmailAccount(
        {
            graphqlStatement = checkUniqueEmailAccountQuery,
            email = null,
            avoidEmails = [],
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            email?: string;
            avoidEmails?: string[];
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<boolean>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamCheckUniqueEmailAccount: boolean;
            }>({
                query    : graphqlStatement,
                variables: {
                    email,
                    avoidEmails,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.iamCheckUniqueEmailAccount),
            );
    }

    paginateWithTenantConstraintAccounts(
        {
            graphqlStatement = paginateWithTenantConstraintAccountsQuery,
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

    // Mutation additionalApis
    updateMeAccount<T>(
        {
            graphqlStatement = updateMeAccountMutation,
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
}
