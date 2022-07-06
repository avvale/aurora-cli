import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { Criteria, GraphQLService, GridData, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
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
        private graphqlService: GraphQLService,
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
            query = {},
            constraint = {},
            offset = 0,
            limit = 10,
            sort = ['id'],
            order = 'desc',
        }: {
            query?: QueryStatement;
            constraint?: QueryStatement;
            offset?: number;
            limit?: number;
            sort?: string | string[];
            order?: string;
        } = {},
    ): Observable<GridData<{{ schema.aggregateName }}>>
    {
        // adapt arguments to aurora SqlStatement
        query = Criteria.getPaginationQueryStatement({ query, offset, limit, sort, order });

        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<{{ schema.aggregateName }}>; }>({
                query    : paginationQuery,
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
            id = '',
            constraint = {},
        }: {
            id?: string;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{{ schema.aggregateName }}>
    {
        return this.graphqlService
            .client()
            .watchQuery<{ object: {{ schema.aggregateName }}; }>({
                query    : findByIdQuery,
                variables: { id, constraint },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { object: {{ schema.aggregateName }}; };}, {{ schema.aggregateName }}>(result => result.data.object),
                tap((object: {{ schema.aggregateName }}) => this.{{ toCamelCase schema.moduleName }}Subject$.next(object)),
            );
    }

    find(
        {
            query = {},
            constraint = {},
        }: {
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{{ schema.aggregateName }}>
    {
        return this.graphqlService
            .client()
            .watchQuery<{ object: {{ schema.aggregateName }}; }>({
                query    : findQuery,
                variables: { query, constraint },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { object: {{ schema.aggregateName }}; };}, {{ schema.aggregateName }}>(result => result.data.object),
                tap((object: {{ schema.aggregateName }}) => this.{{ toCamelCase schema.moduleName }}Subject$.next(object)),
            );
    }

    get(
        {
            query = {},
            constraint = {},
        }: {
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{{ schema.aggregateName }}[]>
    {
        return this.graphqlService
            .client()
            .watchQuery<{ objects: {{ schema.aggregateName }}[]; }>({
                query    : getQuery,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { objects: {{ schema.aggregateName }}[]; };}, {{ schema.aggregateName }}[]>(result => result.data.objects),
                tap((objects: {{ schema.aggregateName }}[]) => this.{{ toCamelCase schema.moduleNames }}Subject$.next(objects)),
            );
    }

    create<T>(
        {
            object = null,
        }: {
            object?: {{ schema.aggregateName }};
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : createMutation,
                variables: {
                    payload: object,
                },
            });
    }

    updateById<T>(
        {
            object = null,
        }: {
            object?: {{ schema.aggregateName }};
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : updateByIdMutation,
                variables: {
                    payload: object,
                },
            });
    }

    update<T>(
        {
            object = null,
            query = {},
            constraint = {},
        }: {
            object?: {{ schema.aggregateName }};
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : updateMutation,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
            });
    }

    deleteById<T>(id: string): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : deleteByIdMutation,
                variables: { id },
            });
    }

    delete<T>(
        {
            query = {},
            constraint = {},
        }: {
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : deleteMutation,
                variables: { query, constraint },
            });
    }
}