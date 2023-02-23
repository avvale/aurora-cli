import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { AuditingHttpCommunication, AuditingCreateHttpCommunication, AuditingUpdateHttpCommunicationById, AuditingUpdateHttpCommunications } from '../auditing.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation } from './http-communication.graphql';

@Injectable({
    providedIn: 'root',
})
export class HttpCommunicationService
{
    paginationSubject$: BehaviorSubject<GridData<AuditingHttpCommunication> | null> = new BehaviorSubject(null);
    httpCommunicationSubject$: BehaviorSubject<AuditingHttpCommunication | null> = new BehaviorSubject(null);
    httpCommunicationsSubject$: BehaviorSubject<AuditingHttpCommunication[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AuditingHttpCommunication>>
    {
        return this.paginationSubject$.asObservable();
    }

    get httpCommunication$(): Observable<AuditingHttpCommunication>
    {
        return this.httpCommunicationSubject$.asObservable();
    }

    get httpCommunications$(): Observable<AuditingHttpCommunication[]>
    {
        return this.httpCommunicationsSubject$.asObservable();
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
    ): Observable<GridData<AuditingHttpCommunication>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AuditingHttpCommunication>; }>({
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
        object: AuditingHttpCommunication;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingHttpCommunication;
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
                    this.httpCommunicationSubject$.next(data.object);
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
        object: AuditingHttpCommunication;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingHttpCommunication;
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
                    this.httpCommunicationSubject$.next(data.object);
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
        objects: AuditingHttpCommunication[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AuditingHttpCommunication[];
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
                    this.httpCommunicationsSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: AuditingCreateHttpCommunication;
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
            object?: AuditingUpdateHttpCommunicationById;
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
            object?: AuditingUpdateHttpCommunications;
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