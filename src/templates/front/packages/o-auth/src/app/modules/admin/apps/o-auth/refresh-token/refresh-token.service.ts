import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { OAuthRefreshToken, OAuthCreateRefreshToken, OAuthUpdateRefreshTokenById, OAuthUpdateRefreshTokens } from '../o-auth.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation } from './refresh-token.graphql';

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenService
{
    paginationSubject$: BehaviorSubject<GridData<OAuthRefreshToken> | null> = new BehaviorSubject(null);
    refreshTokenSubject$: BehaviorSubject<OAuthRefreshToken | null> = new BehaviorSubject(null);
    refreshTokensSubject$: BehaviorSubject<OAuthRefreshToken[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<OAuthRefreshToken>>
    {
        return this.paginationSubject$.asObservable();
    }

    get refreshToken$(): Observable<OAuthRefreshToken>
    {
        return this.refreshTokenSubject$.asObservable();
    }

    get refreshTokens$(): Observable<OAuthRefreshToken[]>
    {
        return this.refreshTokensSubject$.asObservable();
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
    ): Observable<GridData<OAuthRefreshToken>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthRefreshToken>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<OAuthRefreshToken>; };}, GridData<OAuthRefreshToken>>(result => result.data.pagination),
                tap((pagination: GridData<OAuthRefreshToken>) => this.paginationSubject$.next(pagination)),
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
        object: OAuthRefreshToken;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthRefreshToken;
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
                        object: OAuthRefreshToken;
                    };
                },
                {
                    object: OAuthRefreshToken;
                }>(result => result.data),
                tap((data: {
                    object: OAuthRefreshToken;
                }) =>
                {
                    this.refreshTokenSubject$.next(data.object);
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
        object: OAuthRefreshToken;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthRefreshToken;
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
                        object: OAuthRefreshToken;
                    };
                },
                {
                    object: OAuthRefreshToken;
                }>(result => result.data),
                tap((data: {
                    object: OAuthRefreshToken;
                }) =>
                {
                    this.refreshTokenSubject$.next(data.object);
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
        objects: OAuthRefreshToken[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthRefreshToken[];
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
                        objects: OAuthRefreshToken[];
                    };
                },
                {
                    objects: OAuthRefreshToken[];
                }>(result => result.data),
                tap((data: {
                    objects: OAuthRefreshToken[];
                }) =>
                {
                    this.refreshTokensSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthCreateRefreshToken;
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
            object?: OAuthUpdateRefreshTokenById;
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
            object?: OAuthUpdateRefreshTokens;
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