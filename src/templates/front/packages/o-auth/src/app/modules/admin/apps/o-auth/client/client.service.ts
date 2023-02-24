import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { OAuthApplication, OAuthClient, OAuthCreateClient, OAuthScope, OAuthUpdateClientById, OAuthUpdateClients } from '../o-auth.types';
import { ScopeService } from '../scope/scope.service';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, getRelations, findByIdWithRelationsQuery } from './client.graphql';

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
    ) { }

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
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<OAuthClient>; };}, GridData<OAuthClient>>(result => result.data.pagination),
                tap((pagination: GridData<OAuthClient>) => this.paginationSubject$.next(pagination)),
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: OAuthClient;
                    };
                },
                {
                    object: OAuthClient;
                }>(result => result.data),
                tap((data: {
                    object: OAuthClient;
                }) =>
                {
                    this.clientSubject$.next(data.object);
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: OAuthClient;
                    };
                },
                {
                    object: OAuthClient;
                }>(result => result.data),
                tap((data: {
                    object: OAuthClient;
                }) =>
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
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        objects: OAuthClient[];
                    };
                },
                {
                    objects: OAuthClient[];
                }>(result => result.data),
                tap((data: {
                    objects: OAuthClient[];
                }) =>
                {
                    this.clientsSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthCreateClient;
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
            object?: OAuthUpdateClientById;
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
            object?: OAuthUpdateClients;
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

    // ---- customizations ----
    getRelations(): Observable<{
        oAuthGetScopes: OAuthScope[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                oAuthGetScopes: OAuthScope[];
            }>({
                query    : getRelations,
                variables: {},
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: {
                    oAuthGetScopes: OAuthScope[];
                };},
                {
                    oAuthGetScopes: OAuthScope[];
                }>(result => result.data),
                tap((data: {
                    oAuthGetScopes: OAuthScope[];
                }) =>
                {
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: OAuthClient;
                        oAuthGetScopes: OAuthScope[];
                        oAuthGetApplications: OAuthApplication[];
                    };
                },
                {
                    object: OAuthClient;
                    oAuthGetScopes: OAuthScope[];
                    oAuthGetApplications: OAuthApplication[];
                }>(result => result.data),
                tap((data: {
                    object: OAuthClient;
                    oAuthGetScopes: OAuthScope[];
                    oAuthGetApplications: OAuthApplication[];
                }) =>
                {
                    this.clientSubject$.next(data.object);
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                    this.applicationService.applicationsSubject$.next(data.oAuthGetApplications);
                }),
            );
    }
}