import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    IamCreateTenantAccount,
    IamTenantAccount,
    IamUpdateTenantAccountById,
    IamUpdateTenantsAccounts,
} from '@apps/iam';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findQuery,
    getQuery,
    insertMutation,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/iam/tenant-account';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TenantAccountService {
    paginationSubject$: BehaviorSubject<GridData<IamTenantAccount> | null> =
        new BehaviorSubject(null);
    tenantAccountSubject$: BehaviorSubject<IamTenantAccount | null> =
        new BehaviorSubject(null);
    tenantsAccountsSubject$: BehaviorSubject<IamTenantAccount[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<IamTenantAccount> | null>;
    } = {};
    tenantAccountScoped: {
        [key: string]: BehaviorSubject<IamTenantAccount | null>;
    } = {};
    tenantsAccountsScoped: {
        [key: string]: BehaviorSubject<IamTenantAccount[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<IamTenantAccount>> {
        return this.paginationSubject$.asObservable();
    }

    get tenantAccount$(): Observable<IamTenantAccount> {
        return this.tenantAccountSubject$.asObservable();
    }

    get tenantsAccounts$(): Observable<IamTenantAccount[]> {
        return this.tenantsAccountsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<IamTenantAccount>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamTenantAccount>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeTenantAccount(scope: string, object: IamTenantAccount): void {
        if (this.tenantAccountScoped[scope]) {
            this.tenantAccountScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.tenantAccountScoped[scope] = new BehaviorSubject(object);
    }

    getScopeTenantAccount(scope: string): Observable<IamTenantAccount> {
        if (!this.tenantAccountScoped[scope])
            this.tenantAccountScoped[scope] = new BehaviorSubject(null);
        return this.tenantAccountScoped[scope].asObservable();
    }

    setScopeTenantsAccounts(scope: string, objects: IamTenantAccount[]): void {
        if (this.tenantsAccountsScoped[scope]) {
            this.tenantsAccountsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.tenantsAccountsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeTenantsAccounts(scope: string): Observable<IamTenantAccount[]> {
        if (!this.tenantsAccountsScoped[scope])
            this.tenantsAccountsScoped[scope] = new BehaviorSubject(null);
        return this.tenantsAccountsScoped[scope].asObservable();
    }

    pagination({
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
    } = {}): Observable<GridData<IamTenantAccount>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamTenantAccount> }>({
                query: graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data.pagination),
                tap((pagination) =>
                    scope
                        ? this.setScopePagination(scope, pagination)
                        : this.paginationSubject$.next(pagination),
                ),
            );
    }

    findById({
        graphqlStatement = findByIdQuery,
        tenantId = null,
        accountId = null,
        constraint = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        tenantId?: string;
        accountId?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: IamTenantAccount;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamTenantAccount;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    tenantId,
                    accountId,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeTenantAccount(scope, data.object)
                        : this.tenantAccountSubject$.next(data.object),
                ),
            );
    }

    find({
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
    } = {}): Observable<{
        object: IamTenantAccount;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamTenantAccount;
            }>({
                query: parseGqlFields(
                    graphqlStatement,
                    fields,
                    query,
                    constraint,
                ),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeTenantAccount(scope, data.object)
                        : this.tenantAccountSubject$.next(data.object),
                ),
            );
    }

    get({
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
    } = {}): Observable<{
        objects: IamTenantAccount[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamTenantAccount[];
            }>({
                query: parseGqlFields(
                    graphqlStatement,
                    fields,
                    query,
                    constraint,
                ),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeTenantsAccounts(scope, data.objects)
                        : this.tenantsAccountsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamCreateTenantAccount;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: object,
            },
            context: {
                headers,
            },
        });
    }

    insert<T>({
        graphqlStatement = insertMutation,
        objects = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        objects?: IamCreateTenantAccount[];
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: objects,
            },
            context: {
                headers,
            },
        });
    }

    updateById<T>({
        graphqlStatement = updateByIdMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamUpdateTenantAccountById;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: object,
            },
            context: {
                headers,
            },
        });
    }

    update<T>({
        graphqlStatement = updateMutation,
        object = null,
        query = {},
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamUpdateTenantsAccounts;
        query?: QueryStatement;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
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

    deleteById<T>({
        graphqlStatement = deleteByIdMutation,
        tenantId = null,
        accountId = null,
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        tenantId?: string;
        accountId?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                tenantId,
                accountId,
                constraint,
            },
            context: {
                headers,
            },
        });
    }

    delete<T>({
        graphqlStatement = deleteMutation,
        query = {},
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        query?: QueryStatement;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
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
