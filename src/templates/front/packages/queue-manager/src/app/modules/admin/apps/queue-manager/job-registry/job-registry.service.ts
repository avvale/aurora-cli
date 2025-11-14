import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    QueueManagerCreateJobRegistry,
    QueueManagerJobRegistry,
    QueueManagerUpdateJobRegistryById,
    QueueManagerUpdateJobsRegistry,
} from '@apps/queue-manager';
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
} from '@apps/queue-manager/job-registry';
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
export class JobRegistryService {
    paginationSubject$: BehaviorSubject<GridData<QueueManagerJobRegistry> | null> =
        new BehaviorSubject(null);
    jobRegistrySubject$: BehaviorSubject<QueueManagerJobRegistry | null> =
        new BehaviorSubject(null);
    jobsRegistrySubject$: BehaviorSubject<QueueManagerJobRegistry[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<QueueManagerJobRegistry> | null>;
    } = {};
    jobRegistryScoped: {
        [key: string]: BehaviorSubject<QueueManagerJobRegistry | null>;
    } = {};
    jobsRegistryScoped: {
        [key: string]: BehaviorSubject<QueueManagerJobRegistry[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<QueueManagerJobRegistry>> {
        return this.paginationSubject$.asObservable();
    }

    get jobRegistry$(): Observable<QueueManagerJobRegistry> {
        return this.jobRegistrySubject$.asObservable();
    }

    get jobsRegistry$(): Observable<QueueManagerJobRegistry[]> {
        return this.jobsRegistrySubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<QueueManagerJobRegistry>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(
        scope: string,
    ): Observable<GridData<QueueManagerJobRegistry>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeJobRegistry(scope: string, object: QueueManagerJobRegistry): void {
        if (this.jobRegistryScoped[scope]) {
            this.jobRegistryScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.jobRegistryScoped[scope] = new BehaviorSubject(object);
    }

    getScopeJobRegistry(scope: string): Observable<QueueManagerJobRegistry> {
        if (!this.jobRegistryScoped[scope])
            this.jobRegistryScoped[scope] = new BehaviorSubject(null);
        return this.jobRegistryScoped[scope].asObservable();
    }

    setScopeJobsRegistry(
        scope: string,
        objects: QueueManagerJobRegistry[],
    ): void {
        if (this.jobsRegistryScoped[scope]) {
            this.jobsRegistryScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.jobsRegistryScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeJobsRegistry(scope: string): Observable<QueueManagerJobRegistry[]> {
        if (!this.jobsRegistryScoped[scope])
            this.jobsRegistryScoped[scope] = new BehaviorSubject(null);
        return this.jobsRegistryScoped[scope].asObservable();
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
    } = {}): Observable<GridData<QueueManagerJobRegistry>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<QueueManagerJobRegistry> }>({
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
        object: QueueManagerJobRegistry;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerJobRegistry;
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
                        ? this.setScopeJobRegistry(scope, data.object)
                        : this.jobRegistrySubject$.next(data.object),
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
        object: QueueManagerJobRegistry;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerJobRegistry;
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
                        ? this.setScopeJobRegistry(scope, data.object)
                        : this.jobRegistrySubject$.next(data.object),
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
        objects: QueueManagerJobRegistry[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: QueueManagerJobRegistry[];
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
                        ? this.setScopeJobsRegistry(scope, data.objects)
                        : this.jobsRegistrySubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: QueueManagerCreateJobRegistry;
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
        objects?: QueueManagerCreateJobRegistry[];
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
        object?: QueueManagerUpdateJobRegistryById;
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
        object?: QueueManagerUpdateJobsRegistry;
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
