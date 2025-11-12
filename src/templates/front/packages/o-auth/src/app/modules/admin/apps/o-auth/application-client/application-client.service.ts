import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    OAuthApplicationClient,
    OAuthCreateApplicationClient,
    OAuthUpdateApplicationClientById,
    OAuthUpdateApplicationsClients,
} from '@apps/o-auth';
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
} from '@apps/o-auth/application-client';
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
export class ApplicationClientService {
    paginationSubject$: BehaviorSubject<GridData<OAuthApplicationClient> | null> =
        new BehaviorSubject(null);
    applicationClientSubject$: BehaviorSubject<OAuthApplicationClient | null> =
        new BehaviorSubject(null);
    applicationsClientsSubject$: BehaviorSubject<
        OAuthApplicationClient[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<OAuthApplicationClient> | null>;
    } = {};
    applicationClientScoped: {
        [key: string]: BehaviorSubject<OAuthApplicationClient | null>;
    } = {};
    applicationsClientsScoped: {
        [key: string]: BehaviorSubject<OAuthApplicationClient[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<OAuthApplicationClient>> {
        return this.paginationSubject$.asObservable();
    }

    get applicationClient$(): Observable<OAuthApplicationClient> {
        return this.applicationClientSubject$.asObservable();
    }

    get applicationsClients$(): Observable<OAuthApplicationClient[]> {
        return this.applicationsClientsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<OAuthApplicationClient>,
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
    ): Observable<GridData<OAuthApplicationClient>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeApplicationClient(
        scope: string,
        object: OAuthApplicationClient,
    ): void {
        if (this.applicationClientScoped[scope]) {
            this.applicationClientScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.applicationClientScoped[scope] = new BehaviorSubject(object);
    }

    getScopeApplicationClient(
        scope: string,
    ): Observable<OAuthApplicationClient> {
        if (!this.applicationClientScoped[scope])
            this.applicationClientScoped[scope] = new BehaviorSubject(null);
        return this.applicationClientScoped[scope].asObservable();
    }

    setScopeApplicationsClients(
        scope: string,
        objects: OAuthApplicationClient[],
    ): void {
        if (this.applicationsClientsScoped[scope]) {
            this.applicationsClientsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.applicationsClientsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeApplicationsClients(
        scope: string,
    ): Observable<OAuthApplicationClient[]> {
        if (!this.applicationsClientsScoped[scope])
            this.applicationsClientsScoped[scope] = new BehaviorSubject(null);
        return this.applicationsClientsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<OAuthApplicationClient>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthApplicationClient> }>({
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
        applicationId = null,
        clientId = null,
        constraint = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        applicationId?: string;
        clientId?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: OAuthApplicationClient;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthApplicationClient;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    applicationId,
                    clientId,
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
                        ? this.setScopeApplicationClient(scope, data.object)
                        : this.applicationClientSubject$.next(data.object),
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
        object: OAuthApplicationClient;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthApplicationClient;
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
                        ? this.setScopeApplicationClient(scope, data.object)
                        : this.applicationClientSubject$.next(data.object),
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
        objects: OAuthApplicationClient[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthApplicationClient[];
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
                        ? this.setScopeApplicationsClients(scope, data.objects)
                        : this.applicationsClientsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: OAuthCreateApplicationClient;
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
        objects?: OAuthCreateApplicationClient[];
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
        object?: OAuthUpdateApplicationClientById;
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
        object?: OAuthUpdateApplicationsClients;
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
        applicationId = null,
        clientId = null,
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        applicationId?: string;
        clientId?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                applicationId,
                clientId,
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
