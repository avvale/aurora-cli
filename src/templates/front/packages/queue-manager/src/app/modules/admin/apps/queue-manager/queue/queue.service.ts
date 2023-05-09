import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { QueueManagerQueue, QueueManagerCreateQueue, QueueManagerUpdateQueueById, QueueManagerUpdateQueues, QueueManagerJob } from '../queue-manager.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, findByIdWithRelationsQuery } from './queue.graphql';
import { JobService } from '../job/job.service';

@Injectable({
    providedIn: 'root',
})
export class QueueService
{
    paginationSubject$: BehaviorSubject<GridData<QueueManagerQueue> | null> = new BehaviorSubject(null);
    queueSubject$: BehaviorSubject<QueueManagerQueue | null> = new BehaviorSubject(null);
    queuesSubject$: BehaviorSubject<QueueManagerQueue[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly jobService: JobService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<QueueManagerQueue>>
    {
        return this.paginationSubject$.asObservable();
    }

    get queue$(): Observable<QueueManagerQueue>
    {
        return this.queueSubject$.asObservable();
    }

    get queues$(): Observable<QueueManagerQueue[]>
    {
        return this.queuesSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<GridData<QueueManagerQueue>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<QueueManagerQueue>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        object: QueueManagerQueue;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerQueue;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.queueSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            queryPaginateJobs = {},
            constraintPaginateJobs = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            queryPaginateJobs?: QueryStatement;
            constraintPaginateJobs?: QueryStatement;
        } = {},
    ): Observable<{
        object: QueueManagerQueue;
        queueManagerPaginateJobs: GridData<QueueManagerJob>;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerQueue;
                queueManagerPaginateJobs: GridData<QueueManagerJob>;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
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
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.queueSubject$.next(data.object);
                    this.jobService.paginationSubject$.next(data.queueManagerPaginateJobs);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        object: QueueManagerQueue;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerQueue;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.queueSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        objects: QueueManagerQueue[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: QueueManagerQueue[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.queuesSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: QueueManagerCreateQueue;
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
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: QueueManagerUpdateQueueById;
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
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: QueueManagerUpdateQueues;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
            });
    }

    deleteById<T>(
        id: string,
        graphqlStatement = deleteByIdMutation,
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: { id },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: { query, constraint },
            });
    }
}