import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    IamBoundedContext,
    IamCreateBoundedContext,
    IamPermission,
    IamUpdateBoundedContextById,
    IamUpdateBoundedContexts,
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
} from '@apps/iam/bounded-context';
import { PermissionService } from '@apps/iam/permission';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { findByIdWithRelationsQuery } from './bounded-context.graphql';

@Injectable({
    providedIn: 'root',
})
export class BoundedContextService {
    paginationSubject$: BehaviorSubject<GridData<IamBoundedContext> | null> =
        new BehaviorSubject(null);
    boundedContextSubject$: BehaviorSubject<IamBoundedContext | null> =
        new BehaviorSubject(null);
    boundedContextsSubject$: BehaviorSubject<IamBoundedContext[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<IamBoundedContext> | null>;
    } = {};
    boundedContextScoped: {
        [key: string]: BehaviorSubject<IamBoundedContext | null>;
    } = {};
    boundedContextsScoped: {
        [key: string]: BehaviorSubject<IamBoundedContext[] | null>;
    } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly permissionService: PermissionService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<IamBoundedContext>> {
        return this.paginationSubject$.asObservable();
    }

    get boundedContext$(): Observable<IamBoundedContext> {
        return this.boundedContextSubject$.asObservable();
    }

    get boundedContexts$(): Observable<IamBoundedContext[]> {
        return this.boundedContextsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<IamBoundedContext>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamBoundedContext>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeBoundedContext(scope: string, object: IamBoundedContext): void {
        if (this.boundedContextScoped[scope]) {
            this.boundedContextScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.boundedContextScoped[scope] = new BehaviorSubject(object);
    }

    getScopeBoundedContext(scope: string): Observable<IamBoundedContext> {
        if (!this.boundedContextScoped[scope])
            this.boundedContextScoped[scope] = new BehaviorSubject(null);
        return this.boundedContextScoped[scope].asObservable();
    }

    setScopeBoundedContexts(scope: string, objects: IamBoundedContext[]): void {
        if (this.boundedContextsScoped[scope]) {
            this.boundedContextsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.boundedContextsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeBoundedContexts(scope: string): Observable<IamBoundedContext[]> {
        if (!this.boundedContextsScoped[scope])
            this.boundedContextsScoped[scope] = new BehaviorSubject(null);
        return this.boundedContextsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<IamBoundedContext>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamBoundedContext> }>({
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
        object: IamBoundedContext;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamBoundedContext;
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
                        ? this.setScopeBoundedContext(scope, data.object)
                        : this.boundedContextSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryPaginatePermissions = {},
        constraintPaginatePermissions = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryPaginatePermissions?: QueryStatement;
        constraintPaginatePermissions?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: IamBoundedContext;
        iamPaginatePermissions: GridData<IamPermission>;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamBoundedContext;
                iamPaginatePermissions: GridData<IamPermission>;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryPaginatePermissions,
                    constraintPaginatePermissions,
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
                        this.setScopeBoundedContext(scope, data.object);
                    } else {
                        this.boundedContextSubject$.next(data.object);
                    }
                    this.permissionService.paginationSubject$.next(
                        data.iamPaginatePermissions,
                    );
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
        object: IamBoundedContext;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamBoundedContext;
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
                        ? this.setScopeBoundedContext(scope, data.object)
                        : this.boundedContextSubject$.next(data.object),
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
        objects: IamBoundedContext[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamBoundedContext[];
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
                        ? this.setScopeBoundedContexts(scope, data.objects)
                        : this.boundedContextsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamCreateBoundedContext;
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
        objects?: IamCreateBoundedContext[];
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
        object?: IamUpdateBoundedContextById;
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
        object?: IamUpdateBoundedContexts;
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
}
