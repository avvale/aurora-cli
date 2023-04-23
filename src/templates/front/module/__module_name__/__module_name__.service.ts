{{
    setVar 'arrayImports' (
        array
            (object items='Injectable' path='@angular/core')
            (object items=(array 'DocumentNode' 'FetchResult') path='@apollo/client/core')
            (object items=(array 'GraphQLService' 'GridData' 'parseGqlFields' 'QueryStatement') path='@aurora')
            (object items=(array 'BehaviorSubject' 'first' 'map' 'Observable' 'tap') path='rxjs')
            (object items=(array schema.aggregateName (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName)) (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ById') (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames))) path=(sumStrings '../' (toKebabCase schema.boundedContextName) '.types'))
            (object items=(array 'paginationQuery' 'getQuery' 'fields' 'findByIdQuery' 'findQuery' 'createMutation' 'updateByIdMutation' 'updateMutation' 'deleteByIdMutation' 'deleteMutation') path=(sumStrings './' (toKebabCase schema.moduleName) '.graphql'))
    )
~}}
{{#unlessEq schema.properties.lengthWebComponents 0 }}
{{ push arrayImports
    (object items=(array 'getRelations' 'findByIdWithRelationsQuery') path=(sumStrings './' (toKebabCase schema.moduleName) '.graphql'))
~}}
{{/unlessEq}}
{{#each schema.additionalApis}}
{{ push ../arrayImports
    (object items=(sumStrings getVariableName (toPascalCase ../resolverType)) path=(sumStrings './' (toKebabCase ../schema.moduleName) '.graphql'))
~}}
{{/each}}
{{#each schema.properties.withWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipModule) 'Service') path=(sumStrings '../' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.service'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipModule) 'Service') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.service'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=arrayImports) }}}
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
        {{#each schema.properties.withWebComponents}}
        private readonly {{ toCamelCase getRelationshipModule }}Service: {{ toPascalCase getRelationshipModule }}Service,
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
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
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
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
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

    {{#unlessEq schema.properties.lengthWebComponents 0 }}
    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            {{#each schema.properties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase getRelationshipModules }} = {},
            constraint{{ toPascalCase getRelationshipModules }} = {},
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase getRelationshipModules }} = {},
            constraintPaginate{{ toPascalCase getRelationshipModules }} = {},
            {{/eq}}
            {{/each}}
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            {{#each schema.properties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            constraint{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            constraintPaginate{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            {{/eq}}
            {{/each}}
        } = {},
    ): Observable<{
        object: {{ schema.aggregateName }};
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }}: {{ getRelationshipAggregateName }}[];
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{/each}}
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: {{ schema.aggregateName }};
                {{#each schema.properties.withWebComponents}}
                {{#eq webComponent.type 'select'}}
                {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }}: {{ getRelationshipAggregateName }}[];
                {{/eq}}
                {{#eq webComponent.type 'grid-select-element'}}
                {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }}: GridData<{{ getRelationshipAggregateName }}>;
                {{/eq}}
                {{/each}}
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    {{#each schema.properties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    query{{ toPascalCase getRelationshipModules }},
                    constraint{{ toPascalCase getRelationshipModules }},
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    queryPaginate{{ toPascalCase getRelationshipModules }},
                    constraintPaginate{{ toPascalCase getRelationshipModules }},
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
                    this.{{ toCamelCase schema.moduleName }}Subject$.next(data.object);
                    {{#each schema.properties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    this.{{ toCamelCase getRelationshipModule }}Service.{{ toCamelCase getRelationshipModules }}Subject$.next(data.{{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }});
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    this.{{ toCamelCase getRelationshipModule }}Service.paginationSubject$.next(data.{{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }});
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
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
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
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
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
                    this.{{ toCamelCase schema.moduleNames }}Subject$.next(data.objects);
                }),
            );
    }

    {{#unlessEq schema.properties.lengthWebComponents 0 }}
    getRelations(
        {
            {{#each schema.properties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase getRelationshipModules }} = {},
            constraint{{ toPascalCase getRelationshipModules }} = {},
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase getRelationshipModules }} = {},
            constraintPaginate{{ toPascalCase getRelationshipModules }} = {},
            {{/eq}}
            {{/each}}
        }: {
            {{#each schema.properties.withWebComponents}}
            {{#eq webComponent.type 'select'}}
            query{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            constraint{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            {{/eq}}
            {{#eq webComponent.type 'grid-select-element'}}
            queryPaginate{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            constraintPaginate{{ toPascalCase getRelationshipModules }}?: QueryStatement;
            {{/eq}}
            {{/each}}
        } = {},
    ): Observable<{
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }}: {{ getRelationshipAggregateName }}[];
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{/each}}
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                {{#each schema.properties.withWebComponents}}
                {{#eq webComponent.type 'select'}}
                {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }}: {{ getRelationshipAggregateName }}[];
                {{/eq}}
                {{#eq webComponent.type 'grid-select-element'}}
                {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }}: GridData<{{ getRelationshipAggregateName }}>;
                {{/eq}}
                {{/each}}
            }>({
                query    : getRelations,
                variables: {
                    {{#each schema.properties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    query{{ toPascalCase getRelationshipModules }},
                    constraint{{ toPascalCase getRelationshipModules }},
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    queryPaginate{{ toPascalCase getRelationshipModules }},
                    constraintPaginate{{ toPascalCase getRelationshipModules }},
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
                    {{#each schema.properties.withWebComponents}}
                    {{#eq webComponent.type 'select'}}
                    this.{{ toCamelCase getRelationshipModule }}Service.{{ toCamelCase getRelationshipModules }}Subject$.next(data.{{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }});
                    {{/eq}}
                    {{#eq webComponent.type 'grid-select-element'}}
                    this.{{ toCamelCase getRelationshipModule }}Service.paginationSubject$.next(data.{{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }});
                    {{/eq}}
                    {{/each}}
                }),
            );
    }
    {{/unlessEq}}

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
{{#unlessEq schema.additionalApis.lengthQueries 0 }}

    // Queries additionalApis
{{#each schema.additionalApis.queries}}
    {{ getVariableName }}(
        {
            graphqlStatement = {{ getVariableName }}Query,
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

    {{ getVariableName }}<T>(
        {
            graphqlStatement = {{ getVariableName }}Mutation,
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