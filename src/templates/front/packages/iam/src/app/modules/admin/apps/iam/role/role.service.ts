import { IamCreateRole, IamPermission, IamPermissionRole, IamRole, IamUpdateRoleById, IamUpdateRoles } from '../iam.types';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from './role.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { PermissionService } from '../permission/permission.service';
import { PermissionRoleService } from '../permission-role/permission-role.service';

@Injectable({
    providedIn: 'root',
})
export class RoleService
{
    paginationSubject$: BehaviorSubject<GridData<IamRole> | null> = new BehaviorSubject(null);
    roleSubject$: BehaviorSubject<IamRole | null> = new BehaviorSubject(null);
    rolesSubject$: BehaviorSubject<IamRole[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly permissionService: PermissionService,
        private readonly permissionRoleService: PermissionRoleService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<IamRole>>
    {
        return this.paginationSubject$.asObservable();
    }

    get role$(): Observable<IamRole>
    {
        return this.roleSubject$.asObservable();
    }

    get roles$(): Observable<IamRole[]>
    {
        return this.rolesSubject$.asObservable();
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
    ): Observable<GridData<IamRole>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamRole>; }>({
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
        object: IamRole;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRole;
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
                    this.roleSubject$.next(data.object);
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
        object: IamRole;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRole;
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
                    this.roleSubject$.next(data.object);
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
        objects: IamRole[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamRole[];
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
                    this.rolesSubject$.next(data.objects);
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
            object?: IamCreateRole;
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
            object?: IamUpdateRoleById;
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
            object?: IamUpdateRoles;
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

    // ---- customizations ----
    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            queryPaginatePermissionsRoles = {},
            constraintPaginatePermissionsRoles = {},
            queryPaginatePermissions = {},
            constraintPaginatePermissions = {},
            queryGetPermissionsRoles = {},
            constraintGetPermissionsRoles = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            queryPaginatePermissionsRoles?: QueryStatement;
            constraintPaginatePermissionsRoles?: QueryStatement;
            queryPaginatePermissions?: QueryStatement;
            constraintPaginatePermissions?: QueryStatement;
            queryGetPermissionsRoles?: QueryStatement;
            constraintGetPermissionsRoles?: QueryStatement;
        } = {},
    ): Observable<{
        object: IamRole;
        iamPaginatePermissions: GridData<IamPermission>;
        iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
        iamGetPermissionsRoles: IamPermissionRole[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRole;
                iamPaginatePermissions: GridData<IamPermission>;
                iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
                iamGetPermissionsRoles: IamPermissionRole[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryPaginatePermissionsRoles,
                    constraintPaginatePermissionsRoles: {
                        ...constraintPaginatePermissionsRoles,
                        where: {
                            roleId: id,
                        },
                        include: [
                            {
                                association: 'permission',
                            },
                        ],
                    },
                    queryPaginatePermissions,
                    constraintPaginatePermissions,
                    queryGetPermissionsRoles,
                    constraintGetPermissionsRoles,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamRole;
                        iamPaginatePermissions: GridData<IamPermission>;
                        iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
                        iamGetPermissionsRoles: IamPermissionRole[];
                    };
                },
                {
                    object: IamRole;
                    iamPaginatePermissions: GridData<IamPermission>;
                    iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
                    iamGetPermissionsRoles: IamPermissionRole[];
                }>(result => result.data),
                tap((data: {
                    object: IamRole;
                    iamPaginatePermissions: GridData<IamPermission>;
                    iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
                    iamGetPermissionsRoles: IamPermissionRole[];
                }) =>
                {
                    this.roleSubject$.next(data.object);
                    this.permissionService.paginationSubject$.next(data.iamPaginatePermissions);
                    this.permissionRoleService.paginationSubject$.next(data.iamPaginatePermissionsRoles);
                    this.permissionRoleService.permissionsRolesSubject$.next(data.iamGetPermissionsRoles);
                }),
            );
    }
}