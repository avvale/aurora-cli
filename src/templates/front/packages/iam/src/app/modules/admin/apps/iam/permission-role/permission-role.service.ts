import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamCreatePermissionRole, IamPermissionRole, IamUpdatePermissionRoleById, IamUpdatePermissionsRoles } from '@apps/iam';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, insertMutation, paginationQuery, updateByIdMutation, updateMutation } from '@apps/iam/permission-role';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PermissionRoleService
{
    paginationSubject$: BehaviorSubject<GridData<IamPermissionRole> | null> = new BehaviorSubject(null);
    permissionRoleSubject$: BehaviorSubject<IamPermissionRole | null> = new BehaviorSubject(null);
    permissionsRolesSubject$: BehaviorSubject<IamPermissionRole[] | null> = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: { [key: string]: BehaviorSubject<GridData<IamPermissionRole> | null>; } = {};
    permissionRoleScoped: { [key: string]: BehaviorSubject<IamPermissionRole | null>; } = {};
    permissionsRolesScoped: { [key: string]: BehaviorSubject<IamPermissionRole[] | null>; } = {};

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

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<IamPermissionRole>): void
    {
        if (this.paginationScoped[scope])
        {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<IamPermissionRole>>
    {
        if (!this.paginationScoped[scope]) this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePermissionRole(scope: string, object: IamPermissionRole): void
    {
        if (this.permissionRoleScoped[scope])
        {
            this.permissionRoleScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.permissionRoleScoped[scope] = new BehaviorSubject(object);
    }

    getScopePermissionRole(scope: string): Observable<IamPermissionRole>
    {
        if (!this.permissionRoleScoped[scope]) this.permissionRoleScoped[scope] = new BehaviorSubject(null);
        return this.permissionRoleScoped[scope].asObservable();
    }

    setScopePermissionsRoles(scope: string, objects: IamPermissionRole[]): void
    {
        if (this.permissionsRolesScoped[scope])
        {
            this.permissionsRolesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.permissionsRolesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePermissionsRoles(scope: string): Observable<IamPermissionRole[]>
    {
        if (!this.permissionsRolesScoped[scope]) this.permissionsRolesScoped[scope] = new BehaviorSubject(null);
        return this.permissionsRolesScoped[scope].asObservable();
    }

    pagination(
        {
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => scope ? this.setScopePagination(scope, pagination) : this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            permissionId = null,
            roleId = null,
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            permissionId?: string;
            roleId?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                    permissionId,
                    roleId,
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
                tap(data => scope ? this.setScopePermissionRole(scope, data.object) : this.permissionRoleSubject$.next(data.object)),
            );
    }

    find(
        {
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data => scope ? this.setScopePermissionRole(scope, data.object) : this.permissionRoleSubject$.next(data.object)),
            );
    }

    get(
        {
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
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data => scope ? this.setScopePermissionsRoles(scope, data.objects) : this.permissionsRolesSubject$.next(data.objects)),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: IamCreatePermissionRole;
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

    insert<T>(
        {
            graphqlStatement = insertMutation,
            objects = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            objects?: IamCreatePermissionRole[];
            headers?: GraphQLHeaders;
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
            object?: IamUpdatePermissionRoleById;
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
            object?: IamUpdatePermissionsRoles;
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
            permissionId = null,
            roleId = null,
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            permissionId?: string;
            roleId?: string;
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
                    permissionId,
                    roleId,
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
