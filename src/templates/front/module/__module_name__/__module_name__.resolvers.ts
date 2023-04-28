{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@angular/core')
            (object items=(array 'ActivatedRouteSnapshot' 'Resolve' 'RouterStateSnapshot') path='@angular/router')
            (object items=(array 'Action' 'ActionService' 'GridData' 'GridFiltersStorageService' 'GridStateService' 'QueryStatementHandler') path='@aurora')
            (object items='Observable' path='rxjs')
            (object items=schema.aggregateName path=(sumStrings '../' toKebabCase schema.boundedContextName '.types'))
            (object items=(sumStrings (toCamelCase schema.moduleName) 'ColumnsConfig') path=(sumStrings './' (toKebabCase schema.moduleName) '.columns-config'))
            (object items=(sumStrings (toPascalCase schema.moduleName) 'Service') path=(sumStrings './' (toKebabCase schema.moduleName) '.service'))
    )
~}}
{{#each schema.properties.withWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipModuleName) 'Service') path=(sumStrings '../' (toKebabCase getRelationshipModuleName) '/' (toKebabCase getRelationshipModuleName) '.service'))
~}}
{{else}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipBoundedContext) '.types'))
    (object items=(sumStrings (toPascalCase getRelationshipModuleName) 'Service') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModuleName) '/' (toKebabCase getRelationshipModuleName) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each schema.properties.withGridSelectElementWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipModuleName) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipModuleName) '/' (toKebabCase getRelationshipModuleName) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipModuleName) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModuleName) '/' (toKebabCase getRelationshipModuleName) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{#each schema.properties.withGridElementsManagerWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipModuleName) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipModuleName) '/' (toKebabCase getRelationshipModuleName) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase getRelationshipModuleName) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModuleName) '/' (toKebabCase getRelationshipModuleName) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}PaginationResolver implements Resolve<GridData<{{ schema.aggregateName }}>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<GridData<{{ schema.aggregateName }}>>
    {
        this.actionService.action({
            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.view',
            isViewAction: true,
        });

        const gridId = '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination');
        this.gridStateService.setExportActionId(gridId, '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.export');

        return this.{{ toCamelCase schema.moduleName }}Service.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase schema.moduleName }}ColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(gridId))
                .setSort(this.gridStateService.getSort(gridId))
                .setPage(this.gridStateService.getPage(gridId))
                .setSearch(this.gridStateService.getSearchState(gridId))
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
{{#and (eq schema.properties.lengthGridSelectElementWebComponents 0) (eq schema.properties.lengthSelectElementWebComponents 0) }}
export class {{ toPascalCase schema.moduleName }}NewResolver implements Resolve<Action>
{{else ~}}
export class {{ toPascalCase schema.moduleName }}NewResolver implements Resolve<{
    {{#each schema.properties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModuleNames }}: {{ getRelationshipAggregateName }}[];
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModuleNames }}: GridData<{{ getRelationshipAggregateName }}>;
    {{/eq}}
    {{/each}}
}>
{{/and}}
{
    constructor(
{{
    setVar 'injectionsArray' (
        array
            (object variableName='actionService' className='ActionService')
    )
~}}
{{#or (unlessEq schema.properties.lengthGridSelectElementWebComponents 0) (unlessEq schema.properties.lengthSelectElementWebComponents 0) }}
{{ push injectionsArray
    (object variableName=(sumStrings (toCamelCase schema.moduleName) 'Service') className=(sumStrings (toPascalCase schema.moduleName) 'Service'))
~}}
{{/or ~}}
{{#unlessEq schema.properties.lengthGridSelectElementWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{{ constructorInjectorManager (object injections=injectionsArray) }}}
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
{{#and (eq schema.properties.lengthGridSelectElementWebComponents 0) (eq schema.properties.lengthSelectElementWebComponents 0) }}
    ): Action
{{else}}
    ): Observable<{
    {{#each schema.properties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
        {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModuleNames }}: {{ getRelationshipAggregateName }}[];
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModuleNames }}: GridData<{{ getRelationshipAggregateName }}>;
    {{/eq}}
    {{/each}}
    }>
{{/and}}
    {
        {{#each schema.properties.withGridSelectElementWebComponents}}
        // paginate to manage {{ toCamelCase getRelationshipModuleNames }} grid-select-element
        const {{ toCamelCase getRelationshipModuleNames }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModuleNames }}GridList';
        this.gridStateService.setPaginationActionId({{ toCamelCase getRelationshipModuleNames }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModuleNames }}Pagination');
        this.gridStateService.setExportActionId({{ toCamelCase getRelationshipModuleNames }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipModuleNames }}');

        {{/each}}
        {{#and (eq schema.properties.lengthGridSelectElementWebComponents 0) (eq schema.properties.lengthSelectElementWebComponents 0) }}return {{/and}}this.actionService.action({
            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new',
            isViewAction: true,
        });
        {{#or (unlessEq schema.properties.lengthGridSelectElementWebComponents 0) (unlessEq schema.properties.lengthSelectElementWebComponents 0) }}

        return this.{{ toCamelCase schema.moduleName }}Service.getRelations({{#each schema.properties.withGridSelectElementWebComponents}}{
            queryPaginate{{ toPascalCase getRelationshipModuleNames }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase getRelationshipModuleName }}ColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setSort(this.gridStateService.getSort({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setPage(this.gridStateService.getPage({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setSearch(this.gridStateService.getSearchState({{ toCamelCase getRelationshipModuleNames }}GridId))
                .getQueryStatement(),
        }{{/each}});
        {{/or}}
    }
}

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}EditResolver implements Resolve<{
    object: {{ schema.aggregateName }};
    {{#each schema.properties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModuleNames }}: {{ getRelationshipAggregateName }}[];
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModuleNames }}: GridData<{{ getRelationshipAggregateName }}>;
    {{/eq}}
    {{#eq webComponent.type 'grid-elements-manager'}}
    {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModuleNames }}: GridData<{{ getRelationshipAggregateName }}>;
    {{/eq}}
    {{/each}}
}>
{
    constructor(
{{
    setVar 'injectionsArray' (
        array
            (object variableName='actionService' className='ActionService')
            (object variableName=(sumStrings (toCamelCase schema.moduleName) 'Service') className=(sumStrings (toPascalCase schema.moduleName) 'Service'))
    )
~}}
{{#unlessEq schema.properties.lengthGridSelectElementWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{#unlessEq schema.properties.lengthGridElementsManagerWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{{ constructorInjectorManager (object injections=injectionsArray) }}}
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
        object: {{ schema.aggregateName }};
        {{#each schema.properties.withWebComponents}}
        {{#eq webComponent.type 'select'}}
        {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModuleNames }}: {{ getRelationshipAggregateName }}[];
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModuleNames }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{#eq webComponent.type 'grid-elements-manager'}}
        {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModuleNames }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{/each}}
    }>
    {
        {{#each schema.properties.withGridSelectElementWebComponents}}
        // paginate to manage {{ toCamelCase getRelationshipModuleNames }} grid-select-element
        const {{ toCamelCase getRelationshipModuleNames }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModuleNames }}GridList';
        this.gridStateService.setPaginationActionId({{ toCamelCase getRelationshipModuleNames }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModuleNames }}Pagination');
        this.gridStateService.setExportActionId({{ toCamelCase getRelationshipModuleNames }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipModuleNames }}');

        {{/each}}
        {{#each schema.properties.withGridElementsManagerWebComponents}}
        // paginate to manage {{ toCamelCase getRelationshipModuleNames }} grid-elements-manager
        const {{ toCamelCase getRelationshipModuleNames }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModuleNames }}GridList';
        this.gridStateService.setPaginationActionId({{ toCamelCase getRelationshipModuleNames }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModuleNames }}Pagination');
        this.gridStateService.setExportActionId({{ toCamelCase getRelationshipModuleNames }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipModuleNames }}');

        {{/each}}
        this.actionService.action({
            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit',
            isViewAction: true,
        });

        {{#eq schema.properties.lengthWebComponents 0 }}
        return this.{{ toCamelCase schema.moduleName }}Service.findById({
            id: route.paramMap.get('id'),
        });
        {{else}}
        return this.{{ toCamelCase schema.moduleName }}Service.findByIdWithRelations({
            id: route.paramMap.get('id'),
            {{#each schema.properties.withGridSelectElementWebComponents}}
            queryPaginate{{ toPascalCase getRelationshipModuleNames }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase getRelationshipModuleName }}ColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setSort(this.gridStateService.getSort({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setPage(this.gridStateService.getPage({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setSearch(this.gridStateService.getSearchState({{ toCamelCase getRelationshipModuleNames }}GridId))
                .getQueryStatement(),
            constraintPaginate{{ toPascalCase getRelationshipModuleNames }}: { /**/ },
            {{/each}}
            {{#each schema.properties.withGridElementsManagerWebComponents}}
            queryPaginate{{ toPascalCase getRelationshipModuleNames }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase getRelationshipModuleName }}ColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setSort(this.gridStateService.getSort({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setPage(this.gridStateService.getPage({{ toCamelCase getRelationshipModuleNames }}GridId))
                .setSearch(this.gridStateService.getSearchState({{ toCamelCase getRelationshipModuleNames }}GridId))
                .getQueryStatement(),
            constraintPaginate{{ toPascalCase getRelationshipModuleNames }}: {
                where: {
                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: route.paramMap.get('id'),
                },
            },
            {{/each}}
        });
        {{/eq}}
    }
}
