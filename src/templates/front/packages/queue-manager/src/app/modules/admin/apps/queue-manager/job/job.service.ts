import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, QueryStatement, parseGqlFields } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { QueueManagerJob } from '../queue-manager.types';
import { deleteByIdMutation, fields, findByIdQuery, paginationQuery } from './job.graphql';

@Injectable({
    providedIn: 'root',
})
export class JobService
{
    paginationSubject$: BehaviorSubject<GridData<QueueManagerJob> | null> = new BehaviorSubject(null);
    jobSubject$: BehaviorSubject<QueueManagerJob | null> = new BehaviorSubject(null);
    jobsSubject$: BehaviorSubject<QueueManagerJob[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<QueueManagerJob>>
    {
        return this.paginationSubject$.asObservable();
    }

    get job$(): Observable<QueueManagerJob>
    {
        return this.jobSubject$.asObservable();
    }

    get jobs$(): Observable<QueueManagerJob[]>
    {
        return this.jobsSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<QueueManagerJob>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<QueueManagerJob>; }>({
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
            name = '',
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            name?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: QueueManagerJob;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: QueueManagerJob;
            }>({
                query    : parseGqlFields(graphqlStatement, fields),
                variables: {
                    id,
                    name,
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
                    this.jobSubject$.next(data.object);
                }),
            );
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            name = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            name?: string;
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
                    name,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}