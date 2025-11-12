import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    ToolsCreateMigration,
    ToolsMigration,
    ToolsUpdateMigrationById,
    ToolsUpdateMigrations,
} from '@apps/tools';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findQuery,
    getQuery,
    insertMutation,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/tools/migration';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import {
    downScriptMigrationMutation,
    runScriptsMigrationMutation,
    upScriptMigrationMutation,
} from './migration.graphql';

@Injectable({
    providedIn: 'root',
})
export class MigrationService {
    paginationSubject$: BehaviorSubject<GridData<ToolsMigration> | null> =
        new BehaviorSubject(null);
    migrationSubject$: BehaviorSubject<ToolsMigration | null> =
        new BehaviorSubject(null);
    migrationsSubject$: BehaviorSubject<ToolsMigration[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<ToolsMigration> | null>;
    } = {};
    migrationScoped: { [key: string]: BehaviorSubject<ToolsMigration | null> } =
        {};
    migrationsScoped: {
        [key: string]: BehaviorSubject<ToolsMigration[] | null>;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<ToolsMigration>> {
        return this.paginationSubject$.asObservable();
    }

    get migration$(): Observable<ToolsMigration> {
        return this.migrationSubject$.asObservable();
    }

    get migrations$(): Observable<ToolsMigration[]> {
        return this.migrationsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<ToolsMigration>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<ToolsMigration>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeMigration(scope: string, object: ToolsMigration): void {
        if (this.migrationScoped[scope]) {
            this.migrationScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.migrationScoped[scope] = new BehaviorSubject(object);
    }

    getScopeMigration(scope: string): Observable<ToolsMigration> {
        if (!this.migrationScoped[scope])
            this.migrationScoped[scope] = new BehaviorSubject(null);
        return this.migrationScoped[scope].asObservable();
    }

    setScopeMigrations(scope: string, objects: ToolsMigration[]): void {
        if (this.migrationsScoped[scope]) {
            this.migrationsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.migrationsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeMigrations(scope: string): Observable<ToolsMigration[]> {
        if (!this.migrationsScoped[scope])
            this.migrationsScoped[scope] = new BehaviorSubject(null);
        return this.migrationsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<ToolsMigration>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<ToolsMigration> }>({
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
        object: ToolsMigration;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: ToolsMigration;
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
                        ? this.setScopeMigration(scope, data.object)
                        : this.migrationSubject$.next(data.object),
                ),
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
        object: ToolsMigration;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: ToolsMigration;
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
                        ? this.setScopeMigration(scope, data.object)
                        : this.migrationSubject$.next(data.object),
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
        objects: ToolsMigration[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: ToolsMigration[];
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
                        ? this.setScopeMigrations(scope, data.objects)
                        : this.migrationsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: ToolsCreateMigration;
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
        objects?: ToolsCreateMigration[];
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
        object?: ToolsUpdateMigrationById;
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
        object?: ToolsUpdateMigrations;
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
    upScriptMigration<T>({
        graphqlStatement = upScriptMigrationMutation,
        migrationId = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        migrationId?: string;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                migrationId,
            },
            context: {
                headers,
            },
        });
    }

    downScriptMigration<T>({
        graphqlStatement = downScriptMigrationMutation,
        migrationId = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        migrationId?: string;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                migrationId,
            },
            context: {
                headers,
            },
        });
    }

    runScriptsMigration<T>({
        graphqlStatement = runScriptsMigrationMutation,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            context: {
                headers,
            },
        });
    }
}
