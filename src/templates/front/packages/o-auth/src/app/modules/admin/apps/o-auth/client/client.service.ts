import { ApplicationService } from '../application/application.service';
import { OAuthApplication, OAuthScope } from '../o-auth.types';
import { findByIdWithRelationsQuery, getRelations } from './client.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from '@apps/o-auth/client';
import { OAuthClient, OAuthCreateClient, OAuthUpdateClientById, OAuthUpdateClients } from '@apps/o-auth/o-auth.types';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { ScopeService } from '../scope';

@Injectable({
    providedIn: 'root',
})
export class ClientService
{
    paginationSubject$: BehaviorSubject<GridData<OAuthClient> | null> = new BehaviorSubject(null);
    clientSubject$: BehaviorSubject<OAuthClient | null> = new BehaviorSubject(null);
    clientsSubject$: BehaviorSubject<OAuthClient[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly scopeService: ScopeService,
        private readonly applicationService: ApplicationService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<OAuthClient>>
    {
        return this.paginationSubject$.asObservable();
    }

    get client$(): Observable<OAuthClient>
    {
        return this.clientSubject$.asObservable();
    }

    get clients$(): Observable<OAuthClient[]>
    {
        return this.clientsSubject$.asObservable();
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
    ): Observable<GridData<OAuthClient>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthClient>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
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
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: OAuthClient;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthClient;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
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
                    this.clientSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: OAuthClient;
        oAuthGetScopes: OAuthScope[];
        oAuthGetApplications: OAuthApplication[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthClient;
                oAuthGetScopes: OAuthScope[];
                oAuthGetApplications: OAuthApplication[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
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
                    this.clientSubject$.next(data.object);
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                    this.applicationService.applicationsSubject$.next(data.oAuthGetApplications);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: OAuthClient;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthClient;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
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
                    this.clientSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: OAuthClient[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthClient[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
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
                    this.clientsSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            headers = {},
        }: {
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        oAuthGetApplications: OAuthApplication[];
        oAuthGetScopes: OAuthScope[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                oAuthGetApplications: OAuthApplication[];
                oAuthGetScopes: OAuthScope[];
            }>({
                query    : getRelations,
                variables: {},
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
                    this.applicationService.applicationsSubject$.next(data.oAuthGetApplications);
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthCreateClient;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthUpdateClientById;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthUpdateClients;
            query?: QueryStatement;
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
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
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
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
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
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}