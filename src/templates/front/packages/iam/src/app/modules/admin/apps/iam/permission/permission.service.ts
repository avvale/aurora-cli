import { inject, Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    IamBoundedContext,
    IamCreatePermission,
    IamPermission,
    IamUpdatePermissionById,
    IamUpdatePermissions,
} from '@apps/iam';
import { BoundedContextService } from '@apps/iam/bounded-context';
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
} from '@apps/iam/permission';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { findByIdWithRelationsQuery, getRelations } from './permission.graphql';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    paginationSubject$: BehaviorSubject<GridData<IamPermission> | null> =
        new BehaviorSubject(null);
    permissionSubject$: BehaviorSubject<IamPermission | null> =
        new BehaviorSubject(null);
    permissionsSubject$: BehaviorSubject<IamPermission[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<IamPermission> | null>;
    } = {};
    permissionScoped: { [key: string]: BehaviorSubject<IamPermission | null> } =
        {};
    permissionsScoped: {
        [key: string]: BehaviorSubject<IamPermission[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<IamPermission>> {
        return this.paginationSubject$.asObservable();
    }

    get permission$(): Observable<IamPermission> {
        return this.permissionSubject$.asObservable();
    }

    get permissions$(): Observable<IamPermission[]> {
        return this.permissionsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<IamPermission>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamPermission>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePermission(scope: string, object: IamPermission): void {
        if (this.permissionScoped[scope]) {
            this.permissionScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.permissionScoped[scope] = new BehaviorSubject(object);
    }

    getScopePermission(scope: string): Observable<IamPermission> {
        if (!this.permissionScoped[scope])
            this.permissionScoped[scope] = new BehaviorSubject(null);
        return this.permissionScoped[scope].asObservable();
    }

    setScopePermissions(scope: string, objects: IamPermission[]): void {
        if (this.permissionsScoped[scope]) {
            this.permissionsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.permissionsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePermissions(scope: string): Observable<IamPermission[]> {
        if (!this.permissionsScoped[scope])
            this.permissionsScoped[scope] = new BehaviorSubject(null);
        return this.permissionsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<IamPermission>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamPermission> }>({
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
        object: IamPermission;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermission;
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
                        ? this.setScopePermission(scope, data.object)
                        : this.permissionSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryBoundedContexts = {},
        constraintBoundedContexts = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryBoundedContexts?: QueryStatement;
        constraintBoundedContexts?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: IamPermission;
        iamGetBoundedContexts: IamBoundedContext[];
    }> {
        // inject bounded context service to avoid circular dependency
        const boundedContextService = inject(BoundedContextService);

        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermission;
                iamGetBoundedContexts: IamBoundedContext[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryBoundedContexts,
                    constraintBoundedContexts,
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
                        this.setScopePermission(scope, data.object);
                    } else {
                        this.permissionSubject$.next(data.object);
                    }
                    boundedContextService.boundedContextsSubject$.next(
                        data.iamGetBoundedContexts,
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
        object: IamPermission;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermission;
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
                        ? this.setScopePermission(scope, data.object)
                        : this.permissionSubject$.next(data.object),
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
        objects: IamPermission[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamPermission[];
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
                        ? this.setScopePermissions(scope, data.objects)
                        : this.permissionsSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        queryBoundedContexts = {},
        constraintBoundedContexts = {},
        headers = {},
    }: {
        queryBoundedContexts?: QueryStatement;
        constraintBoundedContexts?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        iamGetBoundedContexts: IamBoundedContext[];
    }> {
        // inject bounded context service to avoid circular dependency
        const boundedContextService = inject(BoundedContextService);

        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetBoundedContexts: IamBoundedContext[];
            }>({
                query: getRelations,
                variables: {
                    queryBoundedContexts,
                    constraintBoundedContexts,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    boundedContextService.boundedContextsSubject$.next(
                        data.iamGetBoundedContexts,
                    );
                }),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamCreatePermission;
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
        objects?: IamCreatePermission[];
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
        object?: IamUpdatePermissionById;
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
        object?: IamUpdatePermissions;
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
