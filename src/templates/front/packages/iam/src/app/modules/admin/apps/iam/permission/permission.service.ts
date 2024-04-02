import { BoundedContextService } from '../bounded-context/bounded-context.service';
import { IamBoundedContext } from '../iam.types';
import { findByIdWithRelationsQuery, getRelations } from './permission.graphql';
import { Injectable, inject } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamCreatePermission, IamPermission, IamUpdatePermissionById, IamUpdatePermissions } from '@apps/iam/iam.types';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from '@apps/iam/permission';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PermissionService
{
    paginationSubject$: BehaviorSubject<GridData<IamPermission> | null> = new BehaviorSubject(null);
    permissionSubject$: BehaviorSubject<IamPermission | null> = new BehaviorSubject(null);
    permissionsSubject$: BehaviorSubject<IamPermission[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<IamPermission>>
    {
        return this.paginationSubject$.asObservable();
    }

    get permission$(): Observable<IamPermission>
    {
        return this.permissionSubject$.asObservable();
    }

    get permissions$(): Observable<IamPermission[]>
    {
        return this.permissionsSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<IamPermission>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamPermission>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: IamPermission;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermission;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.permissionSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryBoundedContexts = {},
            constraintBoundedContexts = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryBoundedContexts?: QueryStatement;
            constraintBoundedContexts?: QueryStatement;
        } = {},
    ): Observable<{
        object: IamPermission;
        iamGetBoundedContexts: IamBoundedContext[];
    }>
    {
        // inject bounded context service to avoid circular dependency
        const boundedContextService = inject(BoundedContextService);

        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermission;
                iamGetBoundedContexts: IamBoundedContext[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryBoundedContexts,
                    constraintBoundedContexts,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.permissionSubject$.next(data.object);
                    boundedContextService.boundedContextsSubject$.next(data.iamGetBoundedContexts);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: IamPermission;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermission;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.permissionSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: IamPermission[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamPermission[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.permissionsSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryBoundedContexts = {},
            constraintBoundedContexts = {},
            headers = {},
        }: {
            queryBoundedContexts?: QueryStatement;
            constraintBoundedContexts?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        iamGetBoundedContexts: IamBoundedContext[];
    }>
    {
        // inject bounded context service to avoid circular dependency
        const boundedContextService = inject(BoundedContextService);

        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetBoundedContexts: IamBoundedContext[];
            }>({
                query    : getRelations,
                variables: {
                    queryBoundedContexts,
                    constraintBoundedContexts,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    boundedContextService.boundedContextsSubject$.next(data.iamGetBoundedContexts);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreatePermission;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdatePermissionById;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdatePermissions;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
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
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
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
