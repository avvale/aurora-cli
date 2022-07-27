import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { Criteria, GraphQLService, GridData, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { {{ schema.aggregateName }}, {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { paginationQuery, getQuery, findByIdQuery, findQuery, createMutation, updateByIdMutation, updateMutation, deleteByIdMutation, deleteMutation } from './{{ toKebabCase schema.moduleName }}.graphql';

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}Service
{
    paginationSubject$: BehaviorSubject<GridData<{{ schema.aggregateName }}> | null> = new BehaviorSubject(null);
    {{ toCamelCase schema.moduleName }}Subject$: BehaviorSubject<{{ schema.aggregateName }} | null> = new BehaviorSubject(null);
    {{ toCamelCase schema.moduleNames }}Subject$: BehaviorSubject<{{ schema.aggregateName }}[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<{{ schema.aggregateName }}>>
    {
        return this.paginationSubject$.asObservable();
    }

    get {{ toCamelCase schema.moduleName }}$(): Observable<{{ schema.aggregateName }}>
    {
        return this.{{ toCamelCase schema.moduleName }}Subject$.asObservable();
    }

    get {{ toCamelCase schema.moduleNames }}$(): Observable<{{ schema.aggregateName }}[]>
    {
        return this.{{ toCamelCase schema.moduleNames }}Subject$.asObservable();
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
    ): Observable<GridData<{{ schema.aggregateName }}>>
    {
        // set default values for pagination
        query = Criteria.getPaginationDefaultValuesQueryStatement({ query });

        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<{{ schema.aggregateName }}>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<{{ schema.aggregateName }}>; };}, GridData<{{ schema.aggregateName }}>>(result => result.data.pagination),
                tap((pagination: GridData<{{ schema.aggregateName }}>) => this.paginationSubject$.next(pagination)),
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
        object: {{ schema.aggregateName }};
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: {{ schema.aggregateName }};
            }>({
                query    : graphqlStatement,
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
                        object: {{ schema.aggregateName }};
                    };
                },
                {
                    object: {{ schema.aggregateName }};
                }>(result => result.data),
                tap((data: {
                    object: {{ schema.aggregateName }};
                }) =>
                {
                    this.{{ toCamelCase schema.moduleName }}Subject$.next(data.object);
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
        object: {{ schema.aggregateName }};
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: {{ schema.aggregateName }};
            }>({
                query    : graphqlStatement,
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
                        object: {{ schema.aggregateName }};
                    };
                },
                {
                    object: {{ schema.aggregateName }};
                }>(result => result.data),
                tap((data: {
                    object: {{ schema.aggregateName }};
                }) =>
                {
                    this.{{ toCamelCase schema.moduleName }}Subject$.next(data.object);
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
        objects: {{ schema.aggregateName }}[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: {{ schema.aggregateName }}[];
            }>({
                query    : graphqlStatement,
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
                        objects: {{ schema.aggregateName }}[];
                    };
                },
                {
                    objects: {{ schema.aggregateName }}[];
                }>(result => result.data),
                tap((data: {
                    objects: {{ schema.aggregateName }}[];
                }) =>
                {
                    this.{{ toCamelCase schema.moduleNames }}Subject$.next(data.objects);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }};
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
            object?: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById;
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
            object?: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }};
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

    deleteById<T>(id: string, graphqlStatement = deleteByIdMutation): Observable<FetchResult<T>>
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
}