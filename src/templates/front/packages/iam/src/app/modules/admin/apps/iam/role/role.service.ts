import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    IamCreateRole,
    IamPermission,
    IamPermissionRole,
    IamRole,
    IamUpdateRoleById,
    IamUpdateRoles,
} from '@apps/iam';
import { PermissionService } from '@apps/iam/permission';
import { PermissionRoleService } from '@apps/iam/permission-role';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findByIdWithRelationsQuery,
    findQuery,
    getQuery,
    insertMutation,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/iam/role';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { inheritPermissionsRoleRoleMutation } from './role.graphql';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    paginationSubject$: BehaviorSubject<GridData<IamRole> | null> =
        new BehaviorSubject(null);
    roleSubject$: BehaviorSubject<IamRole | null> = new BehaviorSubject(null);
    rolesSubject$: BehaviorSubject<IamRole[] | null> = new BehaviorSubject(
        null,
    );

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<IamRole> | null>;
    } = {};
    roleScoped: { [key: string]: BehaviorSubject<IamRole | null> } = {};
    rolesScoped: { [key: string]: BehaviorSubject<IamRole[] | null> } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly permissionRoleService: PermissionRoleService,
        private readonly permissionService: PermissionService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<IamRole>> {
        return this.paginationSubject$.asObservable();
    }

    get role$(): Observable<IamRole> {
        return this.roleSubject$.asObservable();
    }

    get roles$(): Observable<IamRole[]> {
        return this.rolesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<IamRole>): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamRole>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeRole(scope: string, object: IamRole): void {
        if (this.roleScoped[scope]) {
            this.roleScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.roleScoped[scope] = new BehaviorSubject(object);
    }

    getScopeRole(scope: string): Observable<IamRole> {
        if (!this.roleScoped[scope])
            this.roleScoped[scope] = new BehaviorSubject(null);
        return this.roleScoped[scope].asObservable();
    }

    setScopeRoles(scope: string, objects: IamRole[]): void {
        if (this.rolesScoped[scope]) {
            this.rolesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.rolesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeRoles(scope: string): Observable<IamRole[]> {
        if (!this.rolesScoped[scope])
            this.rolesScoped[scope] = new BehaviorSubject(null);
        return this.rolesScoped[scope].asObservable();
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
    } = {}): Observable<GridData<IamRole>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<IamRole> }>({
                query: graphqlStatement,
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
        object: IamRole;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRole;
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
                        ? this.setScopeRole(scope, data.object)
                        : this.roleSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryPaginatePermissionsRoles = {},
        constraintPaginatePermissionsRoles = {},
        queryPaginatePermissions = {},
        constraintPaginatePermissions = {},
        queryGetPermissionsRoles = {},
        constraintGetPermissionsRoles = {},
        headers = {},
        scope,
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
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: IamRole;
        iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
        iamPaginatePermissions: GridData<IamPermission>;
        iamGetPermissionsRoles: IamPermissionRole[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRole;
                iamPaginatePermissionsRoles: GridData<IamPermissionRole>;
                iamPaginatePermissions: GridData<IamPermission>;
                iamGetPermissionsRoles: IamPermissionRole[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
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
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    if (scope) {
                        this.setScopeRole(scope, data.object);
                    } else {
                        this.roleSubject$.next(data.object);
                    }
                    this.permissionRoleService.paginationSubject$.next(
                        data.iamPaginatePermissionsRoles,
                    );
                    this.permissionService.paginationSubject$.next(
                        data.iamPaginatePermissions,
                    );
                    this.permissionRoleService.permissionsRolesSubject$.next(
                        data.iamGetPermissionsRoles,
                    );
                }),
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
        object: IamRole;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: IamRole;
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
                        ? this.setScopeRole(scope, data.object)
                        : this.roleSubject$.next(data.object),
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
        objects: IamRole[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: IamRole[];
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
                        ? this.setScopeRoles(scope, data.objects)
                        : this.rolesSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamCreateRole;
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

    insert<T>({
        graphqlStatement = insertMutation,
        objects = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        objects?: IamCreateRole[];
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: objects,
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
        object?: IamUpdateRoleById;
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
        object?: IamUpdateRoles;
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
    inheritPermissionsRoleRole<T>({
        graphqlStatement = inheritPermissionsRoleRoleMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: IamUpdateRoleById;
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
