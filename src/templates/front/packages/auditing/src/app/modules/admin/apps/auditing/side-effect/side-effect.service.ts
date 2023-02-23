import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { AuditingSideEffect, AuditingCreateSideEffect, AuditingUpdateSideEffectById, AuditingUpdateSideEffects } from '../auditing.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, rollbackSideEffectMutation } from './side-effect.graphql';

@Injectable({
    providedIn: 'root',
})
export class SideEffectService
{
    paginationSubject$: BehaviorSubject<GridData<AuditingSideEffect> | null> = new BehaviorSubject(null);
    sideEffectSubject$: BehaviorSubject<AuditingSideEffect | null> = new BehaviorSubject(null);
    sideEffectsSubject$: BehaviorSubject<AuditingSideEffect[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AuditingSideEffect>>
    {
        return this.paginationSubject$.asObservable();
    }

    get sideEffect$(): Observable<AuditingSideEffect>
    {
        return this.sideEffectSubject$.asObservable();
    }

    get sideEffects$(): Observable<AuditingSideEffect[]>
    {
        return this.sideEffectsSubject$.asObservable();
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
    ): Observable<GridData<AuditingSideEffect>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AuditingSideEffect>; }>({
                query    : graphqlStatement,
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<AuditingSideEffect>; };}, GridData<AuditingSideEffect>>(result => result.data.pagination),
                tap((pagination: GridData<AuditingSideEffect>) => this.paginationSubject$.next(pagination)),
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
        object: AuditingSideEffect;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingSideEffect;
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
                        object: AuditingSideEffect;
                    };
                },
                {
                    object: AuditingSideEffect;
                }>(result => result.data),
                tap((data: {
                    object: AuditingSideEffect;
                }) =>
                {
                    this.sideEffectSubject$.next(data.object);
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
        object: AuditingSideEffect;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AuditingSideEffect;
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
                        object: AuditingSideEffect;
                    };
                },
                {
                    object: AuditingSideEffect;
                }>(result => result.data),
                tap((data: {
                    object: AuditingSideEffect;
                }) =>
                {
                    this.sideEffectSubject$.next(data.object);
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
        objects: AuditingSideEffect[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AuditingSideEffect[];
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
                        objects: AuditingSideEffect[];
                    };
                },
                {
                    objects: AuditingSideEffect[];
                }>(result => result.data),
                tap((data: {
                    objects: AuditingSideEffect[];
                }) =>
                {
                    this.sideEffectsSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: AuditingCreateSideEffect;
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
            object?: AuditingUpdateSideEffectById;
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
            object?: AuditingUpdateSideEffects;
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

    // Mutation additionalApis

    rollbackSideEffect<T>(
        {
            graphqlStatement = rollbackSideEffectMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: AuditingUpdateSideEffectById;
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
}