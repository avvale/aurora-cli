import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { Criteria, GraphQLService, GridData, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { graphQL } from './{{ toKebabCase schema.moduleName }}.graphql';

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}Service
{
    private _pagination: BehaviorSubject<GridData<{{ schema.aggregateName }}> | null> = new BehaviorSubject(null);
    private _{{ toCamelCase schema.moduleName }}: BehaviorSubject<{{ schema.aggregateName }} | null> = new BehaviorSubject(null);
    private _{{ toCamelCase schema.moduleNames }}: BehaviorSubject<{{ schema.aggregateName }}[] | null> = new BehaviorSubject(null);

    constructor(
        private graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<{{ schema.aggregateName }}>>
    {
        return this._pagination.asObservable();
    }

    get {{ toCamelCase schema.moduleName }}$(): Observable<{{ schema.aggregateName }}>
    {
        return this._{{ toCamelCase schema.moduleName }}.asObservable();
    }

    get {{ toCamelCase schema.moduleNames }}$(): Observable<{{ schema.aggregateName }}[]>
    {
        return this._{{ toCamelCase schema.moduleNames }}.asObservable();
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
                query    : graphQL.queryPagination,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { pagination: GridData<{{ schema.aggregateName }}>; };}, GridData<{{ schema.aggregateName }}>>(result => result.data.pagination),
                tap((pagination: GridData<{{ schema.aggregateName }}>) => this._pagination.next(pagination)),
            );
    }

    findById(
        {
            id = '',
        }: {
            id?: string;
        } = {},
    ): Observable<{{ schema.aggregateName }}>
    {
        // adapt arguments to aurora SqlStatement
        const args = Criteria.getFindByIdArguments({ id });

        return this.graphqlService
            .client()
            .watchQuery<{ object: {{ schema.aggregateName }}; }>({
                query    : graphQL.queryObject,
                variables: {
                    query: args,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { object: {{ schema.aggregateName }}; };}, {{ schema.aggregateName }}>(result => result.data.object),
                tap((object: {{ schema.aggregateName }}) => this._{{ toCamelCase schema.moduleName }}.next(object)),
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
                query    : graphQL.queryObjects,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { objects: {{ schema.aggregateName }}[]; };}, {{ schema.aggregateName }}[]>(result => result.data.objects),
                tap((objects: {{ schema.aggregateName }}[]) => this._{{ toCamelCase schema.moduleNames }}.next(objects)),
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
                mutation : graphQL.mutationCreateObject,
                variables: {
                    payload: object,
                },
            });
    }

    update<T>(
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
                mutation : graphQL.mutationUpdateObject,
                variables: {
                    payload: object,
                },
            });
    }

    delete<T>(id: string): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphQL.mutationDeleteObjectById,
                variables: { id },
            });
    }
}