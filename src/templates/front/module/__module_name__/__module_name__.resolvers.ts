{{
    setVar 'arrayImports' (
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
{{#each schema.properties.withGridSelectElementWebComponents}}
{{#eq (toKebabCase getRelationshipBoundedContext) (toKebabCase ../schema.boundedContextName)}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipModule) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.columns-config'))
~}}
{{else}}
{{ push ../arrayImports
    (object items=(sumStrings (toCamelCase getRelationshipModule) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase getRelationshipBoundedContext) '/' (toKebabCase getRelationshipModule) '/' (toKebabCase getRelationshipModule) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=arrayImports) }}}
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
{{#eq schema.properties.lengthWebComponents 0 }}
export class {{ toPascalCase schema.moduleName }}NewResolver implements Resolve<Action>
{{else ~}}
export class {{ toPascalCase schema.moduleName }}NewResolver implements Resolve<{
    {{#each schema.properties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }}: {{ getRelationshipAggregateName }}[];
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }}: GridData<{{ getRelationshipAggregateName }}>;
    {{/eq}}
    {{/each}}
}>
{{/eq}}
{
    constructor(
        private readonly actionService: ActionService,
        {{#unlessEq schema.properties.lengthWebComponents 0 }}
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
        {{/unlessEq}}
        {{#unlessEq schema.properties.lengthGridSelectElementWebComponents 0 }}
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        {{/unlessEq}}
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
{{#eq schema.properties.lengthWebComponents 0 }}
    ): Action
{{else}}
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
{{/eq}}
    {
        {{#each schema.properties.withGridSelectElementWebComponents}}
        // paginate to manage {{ toCamelCase getRelationshipModules }} grid-select-element
        const {{ toCamelCase getRelationshipModules }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModule }}GridList';
        this.gridStateService.setPaginationActionId({{ toCamelCase getRelationshipModules }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModules }}Pagination');
        this.gridStateService.setExportActionId({{ toCamelCase getRelationshipModules }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipModules }}');

        {{/each}}
        {{#eq schema.properties.lengthWebComponents 0 }}return {{/eq}}this.actionService.action({
            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new',
            isViewAction: true,
        });
        {{#unlessEq schema.properties.lengthWebComponents 0 }}

        return this.{{ toCamelCase schema.moduleName }}Service.getRelations({{#each schema.properties.withGridSelectElementWebComponents}}{
            queryPaginate{{ toPascalCase getRelationshipModules }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase getRelationshipModule }}ColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState({{ toCamelCase getRelationshipModules }}GridId))
                .setSort(this.gridStateService.getSort({{ toCamelCase getRelationshipModules }}GridId))
                .setPage(this.gridStateService.getPage({{ toCamelCase getRelationshipModules }}GridId))
                .setSearch(this.gridStateService.getSearchState({{ toCamelCase getRelationshipModules }}GridId))
                .getQueryStatement(),
        }{{/each}});
        {{/unlessEq}}
    }
}

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}EditResolver implements Resolve<{
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
    constructor(
        private readonly actionService: ActionService,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
        {{#unlessEq schema.properties.lengthGridSelectElementWebComponents 0 }}
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        {{/unlessEq}}
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
        {{ toCamelCase getRelationshipBoundedContext }}Get{{ toPascalCase getRelationshipModules }}: {{ getRelationshipAggregateName }}[];
        {{/eq}}
        {{#eq webComponent.type 'grid-select-element'}}
        {{ toCamelCase getRelationshipBoundedContext }}Paginate{{ toPascalCase getRelationshipModules }}: GridData<{{ getRelationshipAggregateName }}>;
        {{/eq}}
        {{/each}}
    }>
    {
        {{#each schema.properties.withGridSelectElementWebComponents}}
        // paginate to manage {{ toCamelCase getRelationshipModules }} grid-select-element
        const {{ toCamelCase getRelationshipModules }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModule }}GridList';
        this.gridStateService.setPaginationActionId({{ toCamelCase getRelationshipModules }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase getRelationshipModules }}Pagination');
        this.gridStateService.setExportActionId({{ toCamelCase getRelationshipModules }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase getRelationshipModules }}');

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
            queryPaginate{{ toPascalCase getRelationshipModules }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase getRelationshipModule }}ColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState({{ toCamelCase getRelationshipModules }}GridId))
                .setSort(this.gridStateService.getSort({{ toCamelCase getRelationshipModules }}GridId))
                .setPage(this.gridStateService.getPage({{ toCamelCase getRelationshipModules }}GridId))
                .setSearch(this.gridStateService.getSearchState({{ toCamelCase getRelationshipModules }}GridId))
                .getQueryStatement(),
            constraintPaginate{{ toPascalCase getRelationshipModules }}: { /**/ },
            {{/each}}
        });
        {{/eq}}
    }
}
