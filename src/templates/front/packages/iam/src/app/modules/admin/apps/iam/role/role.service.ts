import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { IamRole, IamCreateRole, IamUpdateRoleById, IamUpdateRoles, IamPermission, IamPermissionRole } from '../iam.types';
import { paginationQuery, getQuery, fields, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation, findByIdWithRelationsQuery } from './role.graphql';
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
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<IamRole>; };}, GridData<IamRole>>(result => result.data.pagination),
                tap((pagination: GridData<IamRole>) => this.paginationSubject$.next(pagination)),
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamRole;
                    };
                },
                {
                    object: IamRole;
                }>(result => result.data),
                tap((data: {
                    object: IamRole;
                }) =>
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
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        object: IamRole;
                    };
                },
                {
                    object: IamRole;
                }>(result => result.data),
                tap((data: {
                    object: IamRole;
                }) =>
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
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
            })
            .valueChanges
            .pipe(
                first(),
                map<{
                    data: {
                        objects: IamRole[];
                    };
                },
                {
                    objects: IamRole[];
                }>(result => result.data),
                tap((data: {
                    objects: IamRole[];
                }) =>
                {
                    this.rolesSubject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreateRole;
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
            object?: IamUpdateRoleById;
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
            object?: IamUpdateRoles;
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