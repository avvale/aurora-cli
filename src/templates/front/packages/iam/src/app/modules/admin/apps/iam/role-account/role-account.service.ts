import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamCreateRoleAccount, IamRoleAccount, IamUpdateRoleAccountById, IamUpdateRolesAccounts } from '@apps/iam';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, insertMutation, paginationQuery, updateByIdMutation, updateMutation } from '@apps/iam/role-account';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleAccountService
{
    paginationSubject$: BehaviorSubject<GridData<IamRoleAccount> | null> = new BehaviorSubject(null);
    roleAccountSubject$: BehaviorSubject<IamRoleAccount | null> = new BehaviorSubject(null);
    rolesAccountsSubject$: BehaviorSubject<IamRoleAccount[] | null> = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: { [key: string]: BehaviorSubject<GridData<IamRoleAccount> | null>; } = {};
    roleAccountScoped: { [key: string]: BehaviorSubject<IamRoleAccount | null>; } = {};
    rolesAccountsScoped: { [key: string]: BehaviorSubject<IamRoleAccount[] | null>; } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<IamRoleAccount>>
    {
        return this.paginationSubject$.asObservable();
    }

    get roleAccount$(): Observable<IamRoleAccount>
    {
        return this.roleAccountSubject$.asObservable();
    }

    get rolesAccounts$(): Observable<IamRoleAccount[]>
    {
        return this.rolesAccountsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<IamRoleAccount>): void
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
    getScopePagination(scope: string): Observable<GridData<IamRoleAccount>>
    {
        if (!this.paginationScoped[scope]) this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeRoleAccount(scope: string, object: IamRoleAccount): void
    {
        if (this.roleAccountScoped[scope])
        {
            this.roleAccountScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.roleAccountScoped[scope] = new BehaviorSubject(object);
    }

    getScopeRoleAccount(scope: string): Observable<IamRoleAccount>
    {
        if (!this.roleAccountScoped[scope]) this.roleAccountScoped[scope] = new BehaviorSubject(null);
        return this.roleAccountScoped[scope].asObservable();
    }

    setScopeRolesAccounts(scope: string, objects: IamRoleAccount[]): void
    {
        if (this.rolesAccountsScoped[scope])
        {
            this.rolesAccountsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.rolesAccountsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeRolesAccounts(scope: string): Observable<IamRoleAccount[]>
    {
        if (!this.rolesAccountsScoped[scope]) this.rolesAccountsScoped[scope] = new BehaviorSubject(null);
        return this.rolesAccountsScoped[scope].asObservable();
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
    ): Observable<GridData<IamRoleAccount>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamRoleAccount>; }>({
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
            roleId = null,
            accountId = null,
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            roleId?: string;
            accountId?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<{
        object: IamRoleAccount;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRoleAccount;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    roleId,
                    accountId,
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
                tap(data => scope ? this.setScopeRoleAccount(scope, data.object) : this.roleAccountSubject$.next(data.object)),
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
        object: IamRoleAccount;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRoleAccount;
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
                tap(data => scope ? this.setScopeRoleAccount(scope, data.object) : this.roleAccountSubject$.next(data.object)),
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
        objects: IamRoleAccount[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamRoleAccount[];
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
                tap(data => scope ? this.setScopeRolesAccounts(scope, data.objects) : this.rolesAccountsSubject$.next(data.objects)),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreateRoleAccount;
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
            objects?: IamCreateRoleAccount[];
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
            object?: IamUpdateRoleAccountById;
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
            object?: IamUpdateRolesAccounts;
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
            roleId = null,
            accountId = null,
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            roleId?: string;
            accountId?: string;
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
                    roleId,
                    accountId,
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
