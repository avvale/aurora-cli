import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    AuditingCreateHttpCommunication,
    AuditingHttpCommunication,
    AuditingUpdateHttpCommunicationById,
    AuditingUpdateHttpCommunications,
} from '@apps/auditing';
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
} from '@apps/auditing/http-communication';
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
export class HttpCommunicationService {
    paginationSubject$: BehaviorSubject<GridData<AuditingHttpCommunication> | null> =
        new BehaviorSubject(null);
    httpCommunicationSubject$: BehaviorSubject<AuditingHttpCommunication | null> =
        new BehaviorSubject(null);
    httpCommunicationsSubject$: BehaviorSubject<
        AuditingHttpCommunication[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<AuditingHttpCommunication> | null>;
    } = {};
    httpCommunicationScoped: {
        [key: string]: BehaviorSubject<AuditingHttpCommunication | null>;
    } = {};
    httpCommunicationsScoped: {
        [key: string]: BehaviorSubject<AuditingHttpCommunication[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<AuditingHttpCommunication>> {
        return this.paginationSubject$.asObservable();
    }

    get httpCommunication$(): Observable<AuditingHttpCommunication> {
        return this.httpCommunicationSubject$.asObservable();
    }

    get httpCommunications$(): Observable<AuditingHttpCommunication[]> {
        return this.httpCommunicationsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<AuditingHttpCommunication>,
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
    ): Observable<GridData<AuditingHttpCommunication>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeHttpCommunication(
        scope: string,
        object: AuditingHttpCommunication,
    ): void {
        if (this.httpCommunicationScoped[scope]) {
            this.httpCommunicationScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.httpCommunicationScoped[scope] = new BehaviorSubject(object);
    }

    getScopeHttpCommunication(
        scope: string,
    ): Observable<AuditingHttpCommunication> {
        if (!this.httpCommunicationScoped[scope])
            this.httpCommunicationScoped[scope] = new BehaviorSubject(null);
        return this.httpCommunicationScoped[scope].asObservable();
    }

    setScopeHttpCommunications(
        scope: string,
        objects: AuditingHttpCommunication[],
    ): void {
        if (this.httpCommunicationsScoped[scope]) {
            this.httpCommunicationsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.httpCommunicationsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeHttpCommunications(
        scope: string,
    ): Observable<AuditingHttpCommunication[]> {
        if (!this.httpCommunicationsScoped[scope])
            this.httpCommunicationsScoped[scope] = new BehaviorSubject(null);
        return this.httpCommunicationsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<AuditingHttpCommunication>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AuditingHttpCommunication> }>({
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
        object: AuditingHttpCommunication;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingHttpCommunication;
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
                        ? this.setScopeHttpCommunication(scope, data.object)
                        : this.httpCommunicationSubject$.next(data.object),
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
        object: AuditingHttpCommunication;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingHttpCommunication;
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
                        ? this.setScopeHttpCommunication(scope, data.object)
                        : this.httpCommunicationSubject$.next(data.object),
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
        objects: AuditingHttpCommunication[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AuditingHttpCommunication[];
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
                        ? this.setScopeHttpCommunications(scope, data.objects)
                        : this.httpCommunicationsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: AuditingCreateHttpCommunication;
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
        objects?: AuditingCreateHttpCommunication[];
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
        object?: AuditingUpdateHttpCommunicationById;
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
        object?: AuditingUpdateHttpCommunications;
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
