import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { OAuthScope, OAuthCreateScope, OAuthUpdateScopeById, OAuthUpdateScopes } from '../o-auth.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation } from './scope.graphql';

@Injectable({
    providedIn: 'root',
})
export class ScopeService
{
    paginationSubject$: BehaviorSubject<GridData<OAuthScope> | null> = new BehaviorSubject(null);
    scopeSubject$: BehaviorSubject<OAuthScope | null> = new BehaviorSubject(null);
    scopesSubject$: BehaviorSubject<OAuthScope[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<OAuthScope>>
    {
        return this.paginationSubject$.asObservable();
    }

    get scope$(): Observable<OAuthScope>
    {
        return this.scopeSubject$.asObservable();
    }

    get scopes$(): Observable<OAuthScope[]>
    {
        return this.scopesSubject$.asObservable();
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
    ): Observable<GridData<OAuthScope>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthScope>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<OAuthScope>; };}, GridData<OAuthScope>>(result => result.data.pagination),
                tap((pagination: GridData<OAuthScope>) => this.paginationSubject$.next(pagination)),
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
        object: OAuthScope;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthScope;
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
                        object: OAuthScope;
                    };
                },
                {
                    object: OAuthScope;
                }>(result => result.data),
                tap((data: {
                    object: OAuthScope;
                }) =>
                {
                    this.scopeSubject$.next(data.object);
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
        object: OAuthScope;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthScope;
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
                        object: OAuthScope;
                    };
                },
                {
                    object: OAuthScope;
                }>(result => result.data),
                tap((data: {
                    object: OAuthScope;
                }) =>
                {
                    this.scopeSubject$.next(data.object);
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
        objects: OAuthScope[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthScope[];
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
                        objects: OAuthScope[];
                    };
                },
                {
                    objects: OAuthScope[];
                }>(result => result.data),
                tap((data: {
                    objects: OAuthScope[];
                }) =>
                {
                    this.scopesSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthCreateScope;
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
            object?: OAuthUpdateScopeById;
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
            object?: OAuthUpdateScopes;
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