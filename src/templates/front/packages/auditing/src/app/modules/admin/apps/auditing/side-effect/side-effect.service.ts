import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    AuditingCreateSideEffect,
    AuditingSideEffect,
    AuditingUpdateSideEffectById,
    AuditingUpdateSideEffects,
} from '@apps/auditing';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findQuery,
    getQuery,
    paginationQuery,
    rollbackSideEffectMutation,
    updateByIdMutation,
    updateMutation,
} from '@apps/auditing/side-effect';
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
export class SideEffectService {
    paginationSubject$: BehaviorSubject<GridData<AuditingSideEffect> | null> =
        new BehaviorSubject(null);
    sideEffectSubject$: BehaviorSubject<AuditingSideEffect | null> =
        new BehaviorSubject(null);
    sideEffectsSubject$: BehaviorSubject<AuditingSideEffect[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<AuditingSideEffect> | null>;
    } = {};
    sideEffectScoped: {
        [key: string]: BehaviorSubject<AuditingSideEffect | null>;
    } = {};
    sideEffectsScoped: {
        [key: string]: BehaviorSubject<AuditingSideEffect[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<AuditingSideEffect>> {
        return this.paginationSubject$.asObservable();
    }

    get sideEffect$(): Observable<AuditingSideEffect> {
        return this.sideEffectSubject$.asObservable();
    }

    get sideEffects$(): Observable<AuditingSideEffect[]> {
        return this.sideEffectsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<AuditingSideEffect>,
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
    ): Observable<GridData<AuditingSideEffect>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeSideEffect(scope: string, object: AuditingSideEffect): void {
        if (this.sideEffectScoped[scope]) {
            this.sideEffectScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.sideEffectScoped[scope] = new BehaviorSubject(object);
    }

    getScopeSideEffect(scope: string): Observable<AuditingSideEffect> {
        if (!this.sideEffectScoped[scope])
            this.sideEffectScoped[scope] = new BehaviorSubject(null);
        return this.sideEffectScoped[scope].asObservable();
    }

    setScopeSideEffects(scope: string, objects: AuditingSideEffect[]): void {
        if (this.sideEffectsScoped[scope]) {
            this.sideEffectsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.sideEffectsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeSideEffects(scope: string): Observable<AuditingSideEffect[]> {
        if (!this.sideEffectsScoped[scope])
            this.sideEffectsScoped[scope] = new BehaviorSubject(null);
        return this.sideEffectsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<AuditingSideEffect>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AuditingSideEffect> }>({
                query: graphqlStatement,
                variables: {
                    query,
                    constraint: {
                        ...constraint,
                        attributes: [
                            'id',
                            'modelName',
                            'email',
                            'event',
                            'auditableId',
                            'tags',
                            'ip',
                            'method',
                            'baseUrl',
                            'params',
                            'query',
                            'userAgent',
                            'isRollback',
                            'createdAt',
                        ],
                        order: [
                            ['createdAt', 'desc'],
                            ['operationSort', 'asc'],
                        ],
                    },
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
        object: AuditingSideEffect;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingSideEffect;
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
                        ? this.setScopeSideEffect(scope, data.object)
                        : this.sideEffectSubject$.next(data.object),
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
        object: AuditingSideEffect;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingSideEffect;
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
                        ? this.setScopeSideEffect(scope, data.object)
                        : this.sideEffectSubject$.next(data.object),
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
        objects: AuditingSideEffect[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AuditingSideEffect[];
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
                        ? this.setScopeSideEffects(scope, data.objects)
                        : this.sideEffectsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: AuditingCreateSideEffect;
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
        object?: AuditingUpdateSideEffectById;
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
        object?: AuditingUpdateSideEffects;
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

    // Mutation additionalApis
    rollbackSideEffect<T>({
        graphqlStatement = rollbackSideEffectMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: AuditingUpdateSideEffectById;
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
}
