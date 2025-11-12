import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    OAuthApplication,
    OAuthClient,
    OAuthCreateClient,
    OAuthScope,
    OAuthUpdateClientById,
    OAuthUpdateClients,
} from '@apps/o-auth';
import { ApplicationService } from '@apps/o-auth/application';
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
} from '@apps/o-auth/client';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { findByIdWithRelationsQuery, getRelations } from './client.graphql';
import { ScopeService } from '@apps/o-auth/scope';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    paginationSubject$: BehaviorSubject<GridData<OAuthClient> | null> =
        new BehaviorSubject(null);
    clientSubject$: BehaviorSubject<OAuthClient | null> = new BehaviorSubject(
        null,
    );
    clientsSubject$: BehaviorSubject<OAuthClient[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<OAuthClient> | null>;
    } = {};
    clientScoped: { [key: string]: BehaviorSubject<OAuthClient | null> } = {};
    clientsScoped: { [key: string]: BehaviorSubject<OAuthClient[] | null> } =
        {};

    constructor(
        private readonly scopeService: ScopeService,
        private readonly applicationService: ApplicationService,
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<OAuthClient>> {
        return this.paginationSubject$.asObservable();
    }

    get client$(): Observable<OAuthClient> {
        return this.clientSubject$.asObservable();
    }

    get clients$(): Observable<OAuthClient[]> {
        return this.clientsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<OAuthClient>): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<OAuthClient>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeClient(scope: string, object: OAuthClient): void {
        if (this.clientScoped[scope]) {
            this.clientScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.clientScoped[scope] = new BehaviorSubject(object);
    }

    getScopeClient(scope: string): Observable<OAuthClient> {
        if (!this.clientScoped[scope])
            this.clientScoped[scope] = new BehaviorSubject(null);
        return this.clientScoped[scope].asObservable();
    }

    setScopeClients(scope: string, objects: OAuthClient[]): void {
        if (this.clientsScoped[scope]) {
            this.clientsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.clientsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeClients(scope: string): Observable<OAuthClient[]> {
        if (!this.clientsScoped[scope])
            this.clientsScoped[scope] = new BehaviorSubject(null);
        return this.clientsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<OAuthClient>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthClient> }>({
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
        object: OAuthClient;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthClient;
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
                        ? this.setScopeClient(scope, data.object)
                        : this.clientSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
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
        object: OAuthClient;
        oAuthGetScopes: OAuthScope[];
        oAuthGetApplications: OAuthApplication[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthClient;
                oAuthGetScopes: OAuthScope[];
                oAuthGetApplications: OAuthApplication[];
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
                tap((data) => {
                    if (scope) {
                        this.setScopeClient(scope, data.object);
                    } else {
                        this.clientSubject$.next(data.object);
                    }
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                    this.applicationService.applicationsSubject$.next(
                        data.oAuthGetApplications,
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
        object: OAuthClient;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthClient;
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
                        ? this.setScopeClient(scope, data.object)
                        : this.clientSubject$.next(data.object),
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
        objects: OAuthClient[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthClient[];
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
                        ? this.setScopeClients(scope, data.objects)
                        : this.clientsSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        headers = {},
    }: {
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        oAuthGetApplications: OAuthApplication[];
        oAuthGetScopes: OAuthScope[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                oAuthGetApplications: OAuthApplication[];
                oAuthGetScopes: OAuthScope[];
            }>({
                query: getRelations,
                variables: {},
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    this.applicationService.applicationsSubject$.next(
                        data.oAuthGetApplications,
                    );
                    this.scopeService.scopesSubject$.next(data.oAuthGetScopes);
                }),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: OAuthCreateClient;
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
        objects?: OAuthCreateClient[];
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
        object?: OAuthUpdateClientById;
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
        object?: OAuthUpdateClients;
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
