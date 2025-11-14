import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findByIdWithRelationsQuery,
    findQuery,
    getQuery,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/queue-manager/queue';
import {
    QueueManagerCreateQueue,
    QueueManagerJob,
    QueueManagerQueue,
    QueueManagerUpdateQueueById,
    QueueManagerUpdateQueues,
} from '@apps/queue-manager/queue-manager.types';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { JobService } from '../job/job.service';

@Injectable({
    providedIn: 'root',
})
export class QueueService {
    paginationSubject$: BehaviorSubject<GridData<QueueManagerQueue> | null> =
        new BehaviorSubject(null);
    queueSubject$: BehaviorSubject<QueueManagerQueue | null> =
        new BehaviorSubject(null);
    queuesSubject$: BehaviorSubject<QueueManagerQueue[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<QueueManagerQueue> | null>;
    } = {};
    queueScoped: { [key: string]: BehaviorSubject<QueueManagerQueue | null> } =
        {};
    queuesScoped: {
        [key: string]: BehaviorSubject<QueueManagerQueue[] | null>;
    } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly jobService: JobService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<QueueManagerQueue>> {
        return this.paginationSubject$.asObservable();
    }

    get queue$(): Observable<QueueManagerQueue> {
        return this.queueSubject$.asObservable();
    }

    get queues$(): Observable<QueueManagerQueue[]> {
        return this.queuesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<QueueManagerQueue>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<QueueManagerQueue>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeQueue(scope: string, object: QueueManagerQueue): void {
        if (this.queueScoped[scope]) {
            this.queueScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.queueScoped[scope] = new BehaviorSubject(object);
    }

    getScopeQueue(scope: string): Observable<QueueManagerQueue> {
        if (!this.queueScoped[scope])
            this.queueScoped[scope] = new BehaviorSubject(null);
        return this.queueScoped[scope].asObservable();
    }

    setScopeQueues(scope: string, objects: QueueManagerQueue[]): void {
        if (this.queuesScoped[scope]) {
            this.queuesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.queuesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeQueues(scope: string): Observable<QueueManagerQueue[]> {
        if (!this.queuesScoped[scope])
            this.queuesScoped[scope] = new BehaviorSubject(null);
        return this.queuesScoped[scope].asObservable();
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
    } = {}): Observable<GridData<QueueManagerQueue>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<QueueManagerQueue> }>({
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
        object: QueueManagerQueue;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerQueue;
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
                        ? this.setScopeQueue(scope, data.object)
                        : this.queueSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryPaginateJobs = {},
        constraintPaginateJobs = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryPaginateJobs?: QueryStatement;
        constraintPaginateJobs?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        object: QueueManagerQueue;
        queueManagerPaginateJobs: GridData<QueueManagerJob>;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerQueue;
                queueManagerPaginateJobs: GridData<QueueManagerJob>;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryPaginateJobs,
                    constraintPaginateJobs: {
                        ...constraintPaginateJobs,
                        where: {
                            ...constraintPaginateJobs.where,
                            queueId: id,
                        },
                    },
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    this.queueSubject$.next(data.object);
                    this.jobService.paginationSubject$.next(
                        data.queueManagerPaginateJobs,
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
        object: QueueManagerQueue;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerQueue;
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
                        ? this.setScopeQueue(scope, data.object)
                        : this.queueSubject$.next(data.object),
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
        objects: QueueManagerQueue[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: QueueManagerQueue[];
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
                        ? this.setScopeQueues(scope, data.objects)
                        : this.queuesSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: QueueManagerCreateQueue;
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

    updateById<T>({
        graphqlStatement = updateByIdMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: QueueManagerUpdateQueueById;
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
        object?: QueueManagerUpdateQueues;
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
