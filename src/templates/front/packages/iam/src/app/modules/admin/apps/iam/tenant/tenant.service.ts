import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    IamCreateTenant,
    IamTenant,
    IamUpdateTenantById,
    IamUpdateTenants,
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
} from '@apps/iam/tenant';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import {
    findByIdWithRelationsQuery,
    getRelations,
    getWithTenantConstraintTenantsQuery,
    paginateWithTenantConstraintTenantsQuery,
} from './tenant.graphql';

@Injectable({
    providedIn: 'root',
})
export class TenantService {
    paginationSubject$: BehaviorSubject<GridData<IamTenant> | null> =
        new BehaviorSubject(null);
    tenantSubject$: BehaviorSubject<IamTenant | null> = new BehaviorSubject(
        null,
    );
    tenantsSubject$: BehaviorSubject<IamTenant[] | null> = new BehaviorSubject(
        null,
    );

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<IamTenant> | null>;
    } = {};
    tenantScoped: { [key: string]: BehaviorSubject<IamTenant | null> } = {};
    tenantsScoped: { [key: string]: BehaviorSubject<IamTenant[] | null> } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<IamTenant>> {
        return this.paginationSubject$.asObservable();
    }

    get tenant$(): Observable<IamTenant> {
        return this.tenantSubject$.asObservable();
    }

    get tenants$(): Observable<IamTenant[]> {
        return this.tenantsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<IamTenant>): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamTenant>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeTenant(scope: string, object: IamTenant): void {
        if (this.tenantScoped[scope]) {
            this.tenantScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.tenantScoped[scope] = new BehaviorSubject(object);
    }

    getScopeTenant(scope: string): Observable<IamTenant> {
        if (!this.tenantScoped[scope])
            this.tenantScoped[scope] = new BehaviorSubject(null);
        return this.tenantScoped[scope].asObservable();
    }

    setScopeTenants(scope: string, objects: IamTenant[]): void {
        if (this.tenantsScoped[scope]) {
            this.tenantsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.tenantsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeTenants(scope: string): Observable<IamTenant[]> {
        if (!this.tenantsScoped[scope])
            this.tenantsScoped[scope] = new BehaviorSubject(null);
        return this.tenantsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<IamTenant>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamTenant> }>({
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
    } = {}): Observable<{
        object: IamTenant;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamTenant;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
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
                        ? this.setScopeTenant(scope, data.object)
                        : this.tenantSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryTenants = {},
        constraintTenants = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryTenants?: QueryStatement;
        constraintTenants?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: IamTenant;
        iamGetTenants: IamTenant[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamTenant;
                iamGetTenants: IamTenant[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryTenants,
                    constraintTenants,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    if (scope) {
                        this.setScopeTenant(scope, data.object);
                    } else {
                        this.tenantSubject$.next(data.object);
                    }
                    this.tenantsSubject$.next(data.iamGetTenants);
                }),
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
        object: IamTenant;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamTenant;
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
                        ? this.setScopeTenant(scope, data.object)
                        : this.tenantSubject$.next(data.object),
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
        objects: IamTenant[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamTenant[];
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
                        ? this.setScopeTenants(scope, data.objects)
                        : this.tenantsSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        queryTenants = {},
        constraintTenants = {},
        headers = {},
    }: {
        queryTenants?: QueryStatement;
        constraintTenants?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        iamGetTenants: IamTenant[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetTenants: IamTenant[];
            }>({
                query: getRelations,
                variables: {
                    queryTenants,
                    constraintTenants,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    this.tenantsSubject$.next(data.iamGetTenants);
                }),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamCreateTenant;
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
        objects?: IamCreateTenant[];
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
        object?: IamUpdateTenantById;
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
        object?: IamUpdateTenants;
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
        id = null,
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                id,
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

    // Queries additionalApis
    getWithTenantConstraintTenants({
        graphqlStatement = getWithTenantConstraintTenantsQuery,
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
        objects: IamTenant[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamTenant[];
            }>({
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
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeTenants(scope, data.objects)
                        : this.tenantsSubject$.next(data.objects),
                ),
            );
    }

    paginateWithTenantConstraintTenants({
        graphqlStatement = paginateWithTenantConstraintTenantsQuery,
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
    } = {}): Observable<GridData<IamTenant>> {
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamTenant> }>({
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
}
