import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamRole } from '@apps/iam/iam.types';
import { RoleService } from '@apps/iam/role/role.service';
import {
    OAuthCreateScope,
    OAuthScope,
    OAuthUpdateScopeById,
    OAuthUpdateScopes,
} from '@apps/o-auth/o-auth.types';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findByIdWithRelationsQuery,
    findQuery,
    getQuery,
    getRelations,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/o-auth/scope';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScopeService {
    paginationSubject$: BehaviorSubject<GridData<OAuthScope> | null> =
        new BehaviorSubject(null);
    scopeSubject$: BehaviorSubject<OAuthScope | null> = new BehaviorSubject(
        null,
    );
    scopesSubject$: BehaviorSubject<OAuthScope[] | null> = new BehaviorSubject(
        null,
    );

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<OAuthScope> | null>;
    } = {};
    scopeScoped: { [key: string]: BehaviorSubject<OAuthScope | null> } = {};
    scopesScoped: { [key: string]: BehaviorSubject<OAuthScope[] | null> } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly roleService: RoleService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<OAuthScope>> {
        return this.paginationSubject$.asObservable();
    }

    get scope$(): Observable<OAuthScope> {
        return this.scopeSubject$.asObservable();
    }

    get scopes$(): Observable<OAuthScope[]> {
        return this.scopesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<OAuthScope>): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<OAuthScope>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeScope(scope: string, object: OAuthScope): void {
        if (this.scopeScoped[scope]) {
            this.scopeScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.scopeScoped[scope] = new BehaviorSubject(object);
    }

    getScopeScope(scope: string): Observable<OAuthScope> {
        if (!this.scopeScoped[scope])
            this.scopeScoped[scope] = new BehaviorSubject(null);
        return this.scopeScoped[scope].asObservable();
    }

    setScopeScopes(scope: string, objects: OAuthScope[]): void {
        if (this.scopesScoped[scope]) {
            this.scopesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.scopesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeScopes(scope: string): Observable<OAuthScope[]> {
        if (!this.scopesScoped[scope])
            this.scopesScoped[scope] = new BehaviorSubject(null);
        return this.scopesScoped[scope].asObservable();
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
    } = {}): Observable<GridData<OAuthScope>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<OAuthScope> }>({
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
        object: OAuthScope;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthScope;
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
                        ? this.setScopeScope(scope, data.object)
                        : this.scopeSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        object: OAuthScope;
        iamGetRoles: IamRole[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthScope;
                iamGetRoles: IamRole[];
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
                tap((data) => {
                    this.scopeSubject$.next(data.object);
                    this.roleService.rolesSubject$.next(data.iamGetRoles);
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
        object: OAuthScope;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: OAuthScope;
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
                        ? this.setScopeScope(scope, data.object)
                        : this.scopeSubject$.next(data.object),
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
        objects: OAuthScope[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: OAuthScope[];
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
                        ? this.setScopeScopes(scope, data.objects)
                        : this.scopesSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        headers = {},
    }: {
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        iamGetRoles: IamRole[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetRoles: IamRole[];
            }>({
                query: getRelations,
                variables: {},
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    this.roleService.rolesSubject$.next(data.iamGetRoles);
                }),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: OAuthCreateScope;
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

    updateById<T>({
        graphqlStatement = updateByIdMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: OAuthUpdateScopeById;
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
        object?: OAuthUpdateScopes;
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
}
