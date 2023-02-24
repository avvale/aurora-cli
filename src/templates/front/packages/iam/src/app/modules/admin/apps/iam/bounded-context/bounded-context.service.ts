import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { IamBoundedContext, IamCreateBoundedContext, IamPermission, IamUpdateBoundedContextById, IamUpdateBoundedContexts } from '../iam.types';
import { paginationQuery, getQuery, fields, findByIdWithRelationsQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, findByIdQuery } from './bounded-context.graphql';

// ---- customizations ----
import { PermissionService } from '../permission/permission.service';

@Injectable({
    providedIn: 'root',
})
export class BoundedContextService
{
    paginationSubject$: BehaviorSubject<GridData<IamBoundedContext> | null> = new BehaviorSubject(null);
    boundedContextSubject$: BehaviorSubject<IamBoundedContext | null> = new BehaviorSubject(null);
    boundedContextsSubject$: BehaviorSubject<IamBoundedContext[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly permissionService: PermissionService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<IamBoundedContext>>
    {
        return this.paginationSubject$.asObservable();
    }

    get boundedContext$(): Observable<IamBoundedContext>
    {
        return this.boundedContextSubject$.asObservable();
    }

    get boundedContexts$(): Observable<IamBoundedContext[]>
    {
        return this.boundedContextsSubject$.asObservable();
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
    ): Observable<GridData<IamBoundedContext>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamBoundedContext>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<IamBoundedContext>; };}, GridData<IamBoundedContext>>(result => result.data.pagination),
                tap((pagination: GridData<IamBoundedContext>) => this.paginationSubject$.next(pagination)),
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
        object: IamBoundedContext;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamBoundedContext;
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
                        object: IamBoundedContext;
                    };
                },
                {
                    object: IamBoundedContext;
                }>(result => result.data),
                tap((data: {
                    object: IamBoundedContext;
                }) =>
                {
                    this.boundedContextSubject$.next(data.object);
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
        object: IamBoundedContext;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamBoundedContext;
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
                        object: IamBoundedContext;
                    };
                },
                {
                    object: IamBoundedContext;
                }>(result => result.data),
                tap((data: {
                    object: IamBoundedContext;
                }) =>
                {
                    this.boundedContextSubject$.next(data.object);
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
        objects: IamBoundedContext[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamBoundedContext[];
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
                        objects: IamBoundedContext[];
                    };
                },
                {
                    objects: IamBoundedContext[];
                }>(result => result.data),
                tap((data: {
                    objects: IamBoundedContext[];
                }) =>
                {
                    this.boundedContextsSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreateBoundedContext;
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
            object?: IamUpdateBoundedContextById;
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
            object?: IamUpdateBoundedContexts;
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
    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            queryPaginatePermissions = {},
            constraintPaginatePermissions = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            queryPaginatePermissions?: QueryStatement;
            constraintPaginatePermissions?: QueryStatement;
        } = {},
    ): Observable<{
        object: IamBoundedContext;
        iamPaginatePermissions: GridData<IamPermission>;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamBoundedContext;
                iamPaginatePermissions: GridData<IamPermission>;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryPaginatePermissions: {
                        ...queryPaginatePermissions,
                        where: {
                            ...queryPaginatePermissions.where,
                            boundedContextId: id,
                        },
                    },
                    constraintPaginatePermissions,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamBoundedContext;
                        iamPaginatePermissions: GridData<IamPermission>;
                    };
                },
                {
                    object: IamBoundedContext;
                    iamPaginatePermissions: GridData<IamPermission>;
                }>(result => result.data),
                tap((data: {
                    object: IamBoundedContext;
                    iamPaginatePermissions: GridData<IamPermission>;
                }) =>
                {
                    this.boundedContextSubject$.next(data.object);
                    this.permissionService.paginationSubject$.next(data.iamPaginatePermissions);
                }),
            );
    }
}