/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    CommonCreateResource,
    CommonResource,
    CommonUpdateResourceById,
    CommonUpdateResources,
} from '@apps/common';
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
} from '@apps/common/resource';
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
export class ResourceService {
    paginationSubject$: BehaviorSubject<GridData<CommonResource> | null> =
        new BehaviorSubject(null);
    resourceSubject$: BehaviorSubject<CommonResource | null> =
        new BehaviorSubject(null);
    resourcesSubject$: BehaviorSubject<CommonResource[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<CommonResource> | null>;
    } = {};
    resourceScoped: { [key: string]: BehaviorSubject<CommonResource | null> } =
        {};
    resourcesScoped: {
        [key: string]: BehaviorSubject<CommonResource[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<CommonResource>> {
        return this.paginationSubject$.asObservable();
    }

    get resource$(): Observable<CommonResource> {
        return this.resourceSubject$.asObservable();
    }

    get resources$(): Observable<CommonResource[]> {
        return this.resourcesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<CommonResource>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<CommonResource>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeResource(scope: string, object: CommonResource): void {
        if (this.resourceScoped[scope]) {
            this.resourceScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.resourceScoped[scope] = new BehaviorSubject(object);
    }

    getScopeResource(scope: string): Observable<CommonResource> {
        if (!this.resourceScoped[scope])
            this.resourceScoped[scope] = new BehaviorSubject(null);
        return this.resourceScoped[scope].asObservable();
    }

    setScopeResources(scope: string, objects: CommonResource[]): void {
        if (this.resourcesScoped[scope]) {
            this.resourcesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.resourcesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeResources(scope: string): Observable<CommonResource[]> {
        if (!this.resourcesScoped[scope])
            this.resourcesScoped[scope] = new BehaviorSubject(null);
        return this.resourcesScoped[scope].asObservable();
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
    } = {}): Observable<GridData<CommonResource>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<CommonResource> }>({
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
        object: CommonResource;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: CommonResource;
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
                        ? this.setScopeResource(scope, data.object)
                        : this.resourceSubject$.next(data.object),
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
        object: CommonResource;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: CommonResource;
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
                        ? this.setScopeResource(scope, data.object)
                        : this.resourceSubject$.next(data.object),
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
        objects: CommonResource[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: CommonResource[];
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
                        ? this.setScopeResources(scope, data.objects)
                        : this.resourcesSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: CommonCreateResource;
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
        objects?: CommonCreateResource[];
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
        object?: CommonUpdateResourceById;
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
        object?: CommonUpdateResources;
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
