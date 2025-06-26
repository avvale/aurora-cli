import { checkScriptProcedureMutation, downScriptProcedureMutation, upScriptProcedureMutation } from './procedure.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { ToolsCreateProcedure, ToolsProcedure, ToolsUpdateProcedureById, ToolsUpdateProcedures } from '@apps/tools';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, insertMutation, paginationQuery, updateByIdMutation, updateMutation } from '@apps/tools/procedure';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProcedureService
{
    paginationSubject$: BehaviorSubject<GridData<ToolsProcedure> | null> = new BehaviorSubject(null);
    procedureSubject$: BehaviorSubject<ToolsProcedure | null> = new BehaviorSubject(null);
    proceduresSubject$: BehaviorSubject<ToolsProcedure[] | null> = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: { [key: string]: BehaviorSubject<GridData<ToolsProcedure> | null>; } = {};
    procedureScoped: { [key: string]: BehaviorSubject<ToolsProcedure | null>; } = {};
    proceduresScoped: { [key: string]: BehaviorSubject<ToolsProcedure[] | null>; } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<ToolsProcedure>>
    {
        return this.paginationSubject$.asObservable();
    }

    get procedure$(): Observable<ToolsProcedure>
    {
        return this.procedureSubject$.asObservable();
    }

    get procedures$(): Observable<ToolsProcedure[]>
    {
        return this.proceduresSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<ToolsProcedure>): void
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
    getScopePagination(scope: string): Observable<GridData<ToolsProcedure>>
    {
        if (this.paginationScoped[scope]) return this.paginationScoped[scope].asObservable();

        this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeProcedure(scope: string, object: ToolsProcedure): void
    {
        if (this.procedureScoped[scope])
        {
            this.procedureScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.procedureScoped[scope] = new BehaviorSubject(object);
    }

    getScopeProcedure(scope: string): Observable<ToolsProcedure>
    {
        if (this.procedureScoped[scope]) return this.procedureScoped[scope].asObservable();

        this.procedureScoped[scope] = new BehaviorSubject(null);
        return this.procedureScoped[scope].asObservable();
    }

    setScopeProcedures(scope: string, objects: ToolsProcedure[]): void
    {
        if (this.proceduresScoped[scope])
        {
            this.proceduresScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.proceduresScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeProcedures(scope: string): Observable<ToolsProcedure[]>
    {
        if (this.proceduresScoped[scope]) return this.proceduresScoped[scope].asObservable();

        this.proceduresScoped[scope] = new BehaviorSubject(null);
        return this.proceduresScoped[scope].asObservable();
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
    ): Observable<GridData<ToolsProcedure>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<ToolsProcedure>; }>({
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
        } = {},
    ): Observable<{
        object: ToolsProcedure;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: ToolsProcedure;
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
                tap(data => scope ? this.setScopeProcedure(scope, data.object) : this.procedureSubject$.next(data.object)),
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
        object: ToolsProcedure;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: ToolsProcedure;
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
                tap(data => scope ? this.setScopeProcedure(scope, data.object) : this.procedureSubject$.next(data.object)),
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
        objects: ToolsProcedure[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: ToolsProcedure[];
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
                tap(data => scope ? this.setScopeProcedures(scope, data.objects) : this.proceduresSubject$.next(data.objects)),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: ToolsCreateProcedure;
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
            objects?: ToolsCreateProcedure[];
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
            object?: ToolsUpdateProcedureById;
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
            object?: ToolsUpdateProcedures;
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
            id = null,
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

    // Mutation additionalApis
    upScriptProcedure<T>(
        {
            graphqlStatement = upScriptProcedureMutation,
            procedureId = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            procedureId?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    procedureId,
                },
                context: {
                    headers,
                },
            });
    }

    downScriptProcedure<T>(
        {
            graphqlStatement = downScriptProcedureMutation,
            procedureId = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            procedureId?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    procedureId,
                },
                context: {
                    headers,
                },
            });
    }

    checkScriptProcedure<T>(
        {
            graphqlStatement = checkScriptProcedureMutation,
            procedureId = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            procedureId?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    procedureId,
                },
                context: {
                    headers,
                },
            });
    }
}
