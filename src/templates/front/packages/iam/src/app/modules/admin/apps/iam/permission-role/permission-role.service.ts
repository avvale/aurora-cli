import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { IamUpdatePermissionById, IamUpdatePermissions, IamPermissionRole, IamCreatePermissionRole, IamDeletePermissionRole } from '../iam.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, insertMutation } from './permission-role.graphql';

@Injectable({
    providedIn: 'root',
})
export class PermissionRoleService
{
    paginationSubject$: BehaviorSubject<GridData<IamPermissionRole> | null> = new BehaviorSubject(null);
    permissionRoleSubject$: BehaviorSubject<IamPermissionRole | null> = new BehaviorSubject(null);
    permissionsRolesSubject$: BehaviorSubject<IamPermissionRole[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<IamPermissionRole>>
    {
        return this.paginationSubject$.asObservable();
    }

    get permissionRole$(): Observable<IamPermissionRole>
    {
        return this.permissionRoleSubject$.asObservable();
    }

    get permissionsRoles$(): Observable<IamPermissionRole[]>
    {
        return this.permissionsRolesSubject$.asObservable();
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
    ): Observable<GridData<IamPermissionRole>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamPermissionRole>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<IamPermissionRole>; };}, GridData<IamPermissionRole>>(result => result.data.pagination),
                tap((pagination: GridData<IamPermissionRole>) => this.paginationSubject$.next(pagination)),
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
        object: IamPermissionRole;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermissionRole;
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
                        object: IamPermissionRole;
                    };
                },
                {
                    object: IamPermissionRole;
                }>(result => result.data),
                tap((data: {
                    object: IamPermissionRole;
                }) =>
                {
                    this.permissionRoleSubject$.next(data.object);
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
        object: IamPermissionRole;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamPermissionRole;
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
                        object: IamPermissionRole;
                    };
                },
                {
                    object: IamPermissionRole;
                }>(result => result.data),
                tap((data: {
                    object: IamPermissionRole;
                }) =>
                {
                    this.permissionRoleSubject$.next(data.object);
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
        objects: IamPermissionRole[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamPermissionRole[];
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
                        objects: IamPermissionRole[];
                    };
                },
                {
                    objects: IamPermissionRole[];
                }>(result => result.data),
                tap((data: {
                    objects: IamPermissionRole[];
                }) =>
                {
                    this.permissionsRolesSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreatePermissionRole;
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

    insert<T>(
        {
            graphqlStatement = insertMutation,
            objects = null,
        }: {
            graphqlStatement?: DocumentNode;
            objects?: IamCreatePermissionRole[];
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: objects,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamUpdatePermissionById;
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
            object?: IamUpdatePermissions;
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
        {
            graphqlStatement = deleteByIdMutation,
            object = null,
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamDeletePermissionRole;
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
                    constraint,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            objects = null,
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            objects?: IamDeletePermissionRole[];
            constraint?: QueryStatement;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: objects,
                    constraint,
                },
            });
    }
}
