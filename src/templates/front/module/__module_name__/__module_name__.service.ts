{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@angular/core')
            (object items=(array 'DocumentNode' 'FetchResult') path='@apollo/client/core')
            (object items=(array 'GraphQLHeaders' 'GraphQLService' 'GridData' 'parseGqlFields' 'QueryStatement') path='@aurora')
            (object items=(array 'BehaviorSubject' 'first' 'map' 'Observable' 'tap') path='rxjs')
            (object items=(array schema.aggregateName (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName)) (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ById') (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames))) path=(sumStrings '../' (toKebabCase schema.boundedContextName) '.types'))
            (object items=(array 'paginationQuery' 'getQuery' 'fields' 'findByIdQuery' 'findQuery' 'createMutation' 'updateByIdMutation' 'updateMutation' 'deleteByIdMutation' 'deleteMutation') path=(sumStrings './' (toKebabCase schema.moduleName) '.graphql'))
    )
~}}
{{#unlessEq schema.aggregateProperties.lengthWebComponents 0 }}
{{ push importsArray
    (object items=(array 'findByIdWithRelationsQuery') path=(sumStrings './' (toKebabCase schema.moduleName) '.graphql'))
~}}
{{/unlessEq}}
{{#or (unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0) (unlessEq schema.aggregateProperties.lengthSelectElementWebComponents 0) }}
{{ push importsArray
    (object items=(array 'getRelations') path=(sumStrings './' (toKebabCase schema.moduleName) '.graphql'))
~}}
{{/or}}
{{#each schema.additionalApis}}
{{ push ../importsArray
    (object items=(sumStrings (getVariableNameAdditionalApi this) (toPascalCase ../resolverType)) path=(sumStrings './' (toKebabCase ../schema.moduleName) '.graphql'))
~}}
{{/each}}
{{#each schema.aggregateProperties.withWebComponents}}
{{#eq (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '.types'))
    (object items=(sumStrings (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Service') path=(sumStrings '../' (toKebabCase (getRelationshipModuleNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema)) '.service'))
~}}
{{else}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '.types'))
    (object items=(sumStrings (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Service') path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema)) '.service'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
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
        {{#each schema.aggregateProperties.withWebComponents}}
        private readonly {{ toCamelCase (getRelationshipModuleNameProperty this ../schema) }}Service: {{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Service,
        {{/each}}
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
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<{{ schema.aggregateName }}>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<{{ schema.aggregateName }}>; }>({
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
        object: {{ schema.aggregateName }};
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: {{ schema.aggregateName }};
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
                    this.{{ toCamelCase schema.moduleName }}Subject$.next(data.object);
                }),
            );
    }

    {{#unlessEq schema.aggregateProperties.lengthWebComponents 0 }}
    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            {{#each schema.aggregateProperties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            constraint{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            {{/eq}}
            {{#eq webComponent.type 'grid-elements-manager'}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            {{/eq}}
            {{/each}}
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            {{#each schema.aggregateProperties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            constraint{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            {{/eq}}
            {{#eq webComponent.type 'grid-elements-manager'}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            {{/eq}}
            {{/each}}
        } = {},
    ): Observable<{
        object: {{ schema.aggregateName }};
        {{#each schema.aggregateProperties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: {{ getRelationshipAggregateName }}[];
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{#eq webComponent.type 'grid-elements-manager'}}
        {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{/each}}
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: {{ schema.aggregateName }};
                {{#each schema.aggregateProperties.withWebComponents}}
                {{#eq webComponent.type 'select'}}
                {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: {{ getRelationshipAggregateName }}[];
                {{/eq}}
                {{#eq webComponent.type 'grid-select-element'}}
                {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
                {{/eq}}
                {{#eq webComponent.type 'grid-elements-manager'}}
                {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
                {{/eq}}
                {{/each}}
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    {{#each schema.aggregateProperties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    query{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    constraint{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    {{/eq}}
                    {{#eq webComponent.type 'grid-elements-manager'}}
                    queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    {{/eq}}
                    {{/each}}
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
                    this.{{ toCamelCase schema.moduleName }}Subject$.next(data.object);
                    {{#each schema.aggregateProperties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    this.{{ toCamelCase (getRelationshipModuleNameProperty this ../schema) }}Service.{{ toCamelCase (getRelationshipModuleNamesProperty this ../schema) }}Subject$.next(data.{{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }});
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    this.{{ toCamelCase (getRelationshipModuleNameProperty this ../schema) }}Service.paginationSubject$.next(data.{{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }});
                    {{/eq}}
                    {{#eq webComponent.type 'grid-elements-manager'}}
                    this.{{ toCamelCase (getRelationshipModuleNameProperty this ../schema) }}Service.paginationSubject$.next(data.{{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }});
                    {{/eq}}
                    {{/each}}
                }),
            );
    }

    {{/unlessEq}}
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
        object: {{ schema.aggregateName }};
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: {{ schema.aggregateName }};
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
                    this.{{ toCamelCase schema.moduleName }}Subject$.next(data.object);
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
        objects: {{ schema.aggregateName }}[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: {{ schema.aggregateName }}[];
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
                    this.{{ toCamelCase schema.moduleNames }}Subject$.next(data.objects);
                }),
            );
    }

    {{#or (unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0) (unlessEq schema.aggregateProperties.lengthSelectElementWebComponents 0) }}
    getRelations(
        {
            {{#each schema.aggregateProperties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            constraint{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }} = {},
            {{/eq}}
            {{/each}}
            headers = {},
        }: {
            {{#each schema.aggregateProperties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            constraint{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}?: QueryStatement;
            {{/eq}}
            {{/each}}
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        {{#each schema.aggregateProperties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: {{ getRelationshipAggregateName }}[];
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{/each}}
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                {{#each schema.aggregateProperties.withWebComponents}}
                {{#eq webComponent.type 'select'}}
                {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: {{ getRelationshipAggregateName }}[];
                {{/eq}}
                {{#eq webComponent.type 'grid-select-element'}}
                {{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
                {{/eq}}
                {{/each}}
            }>({
                query    : getRelations,
                variables: {
                    {{#each schema.aggregateProperties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    query{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    constraint{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    queryPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    constraintPaginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }},
                    {{/eq}}
                    {{/each}}
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    {{#each schema.aggregateProperties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    this.{{ toCamelCase (getRelationshipModuleNameProperty this ../schema) }}Service.{{ toCamelCase (getRelationshipModuleNamesProperty this ../schema) }}Subject$.next(data.{{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }});
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    this.{{ toCamelCase (getRelationshipModuleNameProperty this ../schema) }}Service.paginationSubject$.next(data.{{ toCamelCase (getRelationshipBoundedContextNameProperty this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNamesProperty this ../schema) }});
                    {{/eq}}
                    {{/each}}
                }),
            );
    }

    {{/or}}
    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }};
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
            object?: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById;
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
            object?: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }};
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
{{#unlessEq schema.additionalApis.lengthQueries 0 }}

    // Queries additionalApis
{{#each schema.additionalApis.queries}}
    {{ getVariableNameAdditionalApi this }}(
        {
            graphqlStatement = {{ getVgetVariableNameAdditionalApi thisariableName }}Query,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<{
        objects: {{ ../schema.aggregateName }}[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: {{ ../schema.aggregateName }};
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
                map(result => result.data),
                tap(data =>
                {
                    this.{{ toCamelCase ../schema.moduleNames }}Subject$.next(data.objects);
                }),
            );
    }
{{/each}}
{{/unlessEq}}
{{#unlessEq schema.additionalApis.lengthMutations 0 }}

    // Mutation additionalApis
{{#each schema.additionalApis.mutations}}

    {{ getVariableNameAdditionalApi this }}<T>(
        {
            graphqlStatement = {{ getVariableNameAdditionalApi this }}Mutation,
            object = null,
        }: {
            graphqlStatement?: DocumentNode;
            object?: {{ toPascalCase ../schema.boundedContextName }}Update{{ toPascalCase ../schema.moduleName }}ById;
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
{{/each}}
{{/unlessEq}}
}