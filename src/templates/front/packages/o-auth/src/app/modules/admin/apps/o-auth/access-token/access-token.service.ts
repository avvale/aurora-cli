import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { OAuthAccessToken, OAuthCreateAccessToken, OAuthUpdateAccessTokenById, OAuthUpdateAccessTokens } from '../o-auth.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation } from './access-token.graphql';

@Injectable({
    providedIn: 'root',
})
export class AccessTokenService
{
    paginationSubject$: BehaviorSubject<GridData<OAuthAccessToken> | null> = new BehaviorSubject(null);
    accessTokenSubject$: BehaviorSubject<OAuthAccessToken | null> = new BehaviorSubject(null);
    accessTokensSubject$: BehaviorSubject<OAuthAccessToken[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<OAuthAccessToken>>
    {
        return this.paginationSubject$.asObservable();
    }

    get accessToken$(): Observable<OAuthAccessToken>
    {
        return this.accessTokenSubject$.asObservable();
    }

    get accessTokens$(): Observable<OAuthAccessToken[]>
    {
        return this.accessTokensSubject$.asObservable();
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
    ): Observable<GridData<OAuthAccessToken>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthAccessToken>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<OAuthAccessToken>; };}, GridData<OAuthAccessToken>>(result => result.data.pagination),
                tap((pagination: GridData<OAuthAccessToken>) => this.paginationSubject$.next(pagination)),
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
        object: OAuthAccessToken;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthAccessToken;
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
                        object: OAuthAccessToken;
                    };
                },
                {
                    object: OAuthAccessToken;
                }>(result => result.data),
                tap((data: {
                    object: OAuthAccessToken;
                }) =>
                {
                    this.accessTokenSubject$.next(data.object);
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
        object: OAuthAccessToken;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthAccessToken;
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
                        object: OAuthAccessToken;
                    };
                },
                {
                    object: OAuthAccessToken;
                }>(result => result.data),
                tap((data: {
                    object: OAuthAccessToken;
                }) =>
                {
                    this.accessTokenSubject$.next(data.object);
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
        objects: OAuthAccessToken[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthAccessToken[];
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
                        objects: OAuthAccessToken[];
                    };
                },
                {
                    objects: OAuthAccessToken[];
                }>(result => result.data),
                tap((data: {
                    objects: OAuthAccessToken[];
                }) =>
                {
                    this.accessTokensSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: OAuthCreateAccessToken;
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
            object?: OAuthUpdateAccessTokenById;
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
            object?: OAuthUpdateAccessTokens;
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