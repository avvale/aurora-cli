{{
    setVar 'importsArray' (
        array
            (object items='inject' path='@angular/core')
            (object items=(array 'ActivatedRouteSnapshot' 'ResolveFn' 'RouterStateSnapshot') path='@angular/router')
            (object items=(array 'Action' 'ActionService' 'GridData' 'GridFiltersStorageService' 'GridStateService' 'QueryStatementHandler') path='@aurora')
            (object items=schema.aggregateName path=(sumStrings '../' toKebabCase schema.boundedContextName '.types'))
            (object items=(sumStrings (toCamelCase schema.moduleName) 'ColumnsConfig') path=(sumStrings './' (toKebabCase schema.moduleName) '.columns-config'))
            (object items=(sumStrings (toPascalCase schema.moduleName) 'Service') path=(sumStrings './' (toKebabCase schema.moduleName) '.service'))
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{ push importsArray
    (object items=(array 'CoreCurrentLangService' 'CoreLang' 'SessionService') path='@aurora')
~}}
{{/if}}
{{#each schema.aggregateProperties.withWebComponents}}
{{#eq (toKebabCase (getRelationshipBoundedContextName this ../schema)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '.types'))
~}}
{{else}}
{{ push ../importsArray
    (object items=getRelationshipAggregateName path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '/' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '.types'))
~}}
{{/eq}}
{{/each}}
{{#each schema.aggregateProperties.withSelectWebComponents}}
{{#eq (toKebabCase (getRelationshipBoundedContextName this ../schema)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
(object items=(sumStrings (toPascalCase (getRelationshipModuleName this ../schema)) 'Service') path=(sumStrings '../' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.service'))
~}}
{{else}}
{{ push ../importsArray
(object items=(sumStrings (toPascalCase (getRelationshipModuleName this ../schema)) 'Service') path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each schema.aggregateProperties.withGridSelectElementWebComponents}}
{{#eq (toKebabCase (getRelationshipBoundedContextName this ../schema)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getRelationshipModuleName this ../schema)) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.columns-config'))
    (object items=(sumStrings (toPascalCase (getRelationshipModuleName this ../schema)) 'Service') path=(sumStrings '../' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.service'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getRelationshipModuleName this ../schema)) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.columns-config'))
    (object items=(sumStrings (toPascalCase (getRelationshipModuleName this ../schema)) 'Service') path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.service'))
~}}
{{/eq}}
{{/each}}
{{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}
{{#eq (toKebabCase (getRelationshipBoundedContextName this ../schema)) (toKebabCase ../schema.boundedContextName)}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getRelationshipModuleName this ../schema)) 'ColumnsConfig') path=(sumStrings '../' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.columns-config'))
~}}
{{else}}
{{ push ../importsArray
    (object items=(sumStrings (toCamelCase (getRelationshipModuleName this ../schema)) 'ColumnsConfig') path=(sumStrings '../../' (toKebabCase (getRelationshipBoundedContextName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '/' (toKebabCase (getRelationshipModuleName this ../schema)) '.columns-config'))
~}}
{{/eq}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
export const {{ toCamelCase schema.moduleName }}PaginationResolver: ResolveFn<GridData<{{ schema.aggregateName }}>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const {{ toCamelCase schema.moduleName }}Service = inject({{ toPascalCase schema.moduleName }}Service);
    {{#if (hasI18nProperties schema.aggregateProperties) }}
    const sessionService = inject(SessionService);
    {{/if}}

    actionService.action({
        id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.view',
        isViewAction: true,
    });

    const gridId = '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination');
    gridStateService.setExportActionId(gridId, '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.export');

    return {{ toCamelCase schema.moduleName }}Service.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: {{ toCamelCase schema.moduleName }}ColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        headers: {
            'Content-Language': sessionService.get('fallbackLang')[sessionService.get('searchKeyLang')],
        },
        {{/if}}
    });
};

{{#and (eq schema.aggregateProperties.lengthGridSelectElementWebComponents 0) (eq schema.aggregateProperties.lengthSelectElementWebComponents 0) }}
export const {{ toCamelCase schema.moduleName }}NewResolver: ResolveFn<Action{{#if (hasI18nProperties schema.aggregateProperties) }} | { object: {{ schema.aggregateName }}; }{{/if}}> = (
{{else ~}}
export const {{ toCamelCase schema.moduleName }}NewResolver: ResolveFn<{
    {{#each schema.aggregateProperties.withWebComponents}}
    {{#eq webComponent.type 'select'}}
    {{ toCamelCase (getRelationshipBoundedContextName this ../schema) }}Get{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: {{ getRelationshipAggregateName }}[];
    {{/eq}}
    {{#eq webComponent.type 'grid-select-element'}}
    {{ toCamelCase (getRelationshipBoundedContextName this ../schema) }}Paginate{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: GridData<{{ getRelationshipAggregateName }}>;
    {{/eq}}
    {{/each}}
}> = (
{{/and}}
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
{{
    setVar 'injectionsArray' (
        array
            (object variableName='actionService' className='ActionService')
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{ push injectionsArray
    (object variableName='coreCurrentLangService' className='CoreCurrentLangService')
    (object variableName='sessionService' className='SessionService')
    (object variableName=(sumStrings (toCamelCase schema.moduleName) 'Service') className=(sumStrings (toPascalCase schema.moduleName) 'Service'))
~}}
{{/if}}
{{#or (unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0) (unlessEq schema.aggregateProperties.lengthSelectElementWebComponents 0) }}
{{ push injectionsArray
    (object variableName=(sumStrings (toCamelCase schema.moduleName) 'Service') className=(sumStrings (toPascalCase schema.moduleName) 'Service'))
~}}
{{/or ~}}
{{#unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{{ variablesInjectorManager (object injections=injectionsArray) }}}

    {{#each schema.aggregateProperties.withGridSelectElementWebComponents}}
    // paginate to manage {{ toCamelCase (getRelationshipModuleNames this ../schema) }} grid-select-element
    const {{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridList';
    gridStateService.setPaginationActionId({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getRelationshipModuleNames this ../schema) }}Pagination');
    gridStateService.setExportActionId({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase (getRelationshipModuleNames this ../schema) }}');

    {{/each}}
    {{#and (eq schema.aggregateProperties.lengthGridSelectElementWebComponents 0) (eq schema.aggregateProperties.lengthSelectElementWebComponents 0) }}{{#unless (hasI18nProperties schema.aggregateProperties) }}return {{else}}const action = {{/unless}}{{/and}}actionService.action({
        id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new',
        isViewAction: true,
    });
    {{#if (hasI18nProperties schema.aggregateProperties) }}

    // set current lang
    coreCurrentLangService.setCurrentLang(
        sessionService
            .get<CoreLang[]>('langs')
            .find((lang: CoreLang) => lang[sessionService.get('searchKeyLang')] === route.paramMap.get('langId')) ||
        sessionService.get<CoreLang>('fallbackLang'),
    );

    if (route.paramMap.get('id') && route.paramMap.get('langId'))
    {
        return {{ toCamelCase schema.moduleName }}Service
            .findById({
                id        : route.paramMap.get('id'),
                constraint: {
                    include: [{
                        association: '{{ toCamelCase schema.moduleName }}I18n',
                        required   : true,
                        where      : {
                            // retrieves object with the fallback lang to have
                            // a guide to the texts to be translated
                            langId: sessionService.get('fallbackLang').id,
                        },
                    }],
                },
                headers: {
                    'Content-Language': route.paramMap.get('langId'),
                },
            });
    }
    {{/if}}
    {{#or (unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0) (unlessEq schema.aggregateProperties.lengthSelectElementWebComponents 0) }}

    return {{ toCamelCase schema.moduleName }}Service.getRelations({{#each schema.aggregateProperties.withGridSelectElementWebComponents}}{
        queryPaginate{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: QueryStatementHandler
            .init({ columnsConfig: {{ toCamelCase (getRelationshipModuleName this ../schema) }}ColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
            .setSort(gridStateService.getSort({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
            .setPage(gridStateService.getPage({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
            .setSearch(gridStateService.getSearchState({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
            .getQueryStatement(),
    }{{/each}});
    {{else}}
    {{#if (hasI18nProperties schema.aggregateProperties) }}

    return action;
    {{/if}}
    {{/or}}
};

export const {{ toCamelCase schema.moduleName }}EditResolver: ResolveFn<{
{{
    setVar 'returnTypesArray' (
        array
            (object variableName='object' className=schema.aggregateName)
    )
~}}
{{#each schema.aggregateProperties.withWebComponents}}
{{#eq webComponent.type 'select'}}
{{ push ../returnTypesArray
    (object variableName=(sumStrings (toCamelCase (getRelationshipBoundedContextName this ../schema)) 'Get' (toPascalCase (getRelationshipModuleNames this ../schema))) className=(sumStrings getRelationshipAggregateName '[]'))
~}}
{{/eq ~}}
{{#eq webComponent.type 'grid-select-element'}}
{{ push ../returnTypesArray
    (object variableName=(sumStrings (toCamelCase (getRelationshipBoundedContextName this ../schema)) 'Paginate' (toPascalCase (getRelationshipModuleNames this ../schema))) className=(sumStrings 'GridData<' getRelationshipAggregateName '>'))
~}}
{{/eq ~}}
{{#eq webComponent.type 'grid-elements-manager'}}
{{ push ../returnTypesArray
    (object variableName=(sumStrings (toCamelCase (getRelationshipBoundedContextName this ../schema)) 'Paginate' (toPascalCase (getRelationshipModuleNames this ../schema))) className=(sumStrings 'GridData<' getRelationshipAggregateName '>'))
~}}
{{/eq ~}}
{{/each ~}}
{{{ returnTypeManager (object returnTypes=returnTypesArray) }}}
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
{{
    setVar 'injectionsArray' (
        array
            (object variableName='actionService' className='ActionService')
            (object variableName=(sumStrings (toCamelCase schema.moduleName) 'Service') className=(sumStrings (toPascalCase schema.moduleName) 'Service'))
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{ push injectionsArray
    (object variableName='coreCurrentLangService' className='CoreCurrentLangService')
    (object variableName='sessionService' className='SessionService')
~}}
{{/if}}
{{#unlessEq schema.aggregateProperties.lengthGridSelectElementWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{#unlessEq schema.aggregateProperties.lengthGridElementsManagerWebComponents 0 }}
{{ push injectionsArray
    (object variableName='gridFiltersStorageService' className='GridFiltersStorageService')
    (object variableName='gridStateService' className='GridStateService')
~}}
{{/unlessEq ~}}
{{{ variablesInjectorManager (object injections=injectionsArray) }}}

    {{#each schema.aggregateProperties.withGridSelectElementWebComponents}}
    // paginate to manage {{ toCamelCase (getRelationshipModuleNames this ../schema) }} grid-select-element
    const {{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridList';
    gridStateService.setPaginationActionId({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getRelationshipModuleNames this ../schema) }}Pagination');
    gridStateService.setExportActionId({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase (getRelationshipModuleNames this ../schema) }}');

    {{/each}}
    {{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}
    // paginate to manage {{ toCamelCase (getRelationshipModuleNames this ../schema) }} grid-elements-manager
    const {{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId = '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridList';
    gridStateService.setPaginationActionId({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.{{ toCamelCase (getRelationshipModuleNames this ../schema) }}Pagination');
    gridStateService.setExportActionId({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId, '{{ toCamelCase ../schema.boundedContextName }}::{{ toCamelCase ../schema.moduleName }}.detail.export{{ toPascalCase (getRelationshipModuleNames this ../schema) }}');

    {{/each}}
    actionService.action({
        id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit',
        isViewAction: true,
    });

    {{#if (hasI18nProperties schema.aggregateProperties) }}
    // set current lang
    coreCurrentLangService.setCurrentLang(
        sessionService
            .get<CoreLang[]>('langs')
            .find((lang: CoreLang) => lang[sessionService.get('searchKeyLang')] === route.paramMap.get('langId')),
    );

    {{/if}}
    {{#eq schema.aggregateProperties.lengthWebComponents 0 }}
    return {{ toCamelCase schema.moduleName }}Service
        .findById({
            id: route.paramMap.get('id'),
            {{#if (hasI18nProperties schema.aggregateProperties) }}
            headers: {
                'Content-Language': route.paramMap.get('langId'),
            },
            {{/if}}
        });
    {{else}}
    return {{ toCamelCase schema.moduleName }}Service
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
            {{#if (hasI18nProperties schema.aggregateProperties) }}
            headers: {
                'Content-Language': route.paramMap.get('langId'),
            },
            {{/if}}
            {{#each schema.aggregateProperties.withGridSelectElementWebComponents}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase (getRelationshipModuleName this ../schema) }}ColumnsConfig })
                .setColumFilters(gridFiltersStorageService.getColumnFilterState({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .setSort(gridStateService.getSort({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .setPage(gridStateService.getPage({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .setSearch(gridStateService.getSearchState({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .getQueryStatement(),
            constraintPaginate{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: { /**/ },
            {{/each}}
            {{#each schema.aggregateProperties.withGridElementsManagerWebComponents}}
            queryPaginate{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: QueryStatementHandler
                .init({ columnsConfig: {{ toCamelCase (getRelationshipModuleName this ../schema) }}ColumnsConfig })
                .setColumFilters(gridFiltersStorageService.getColumnFilterState({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .setSort(gridStateService.getSort({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .setPage(gridStateService.getPage({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .setSearch(gridStateService.getSearchState({{ toCamelCase (getRelationshipModuleNames this ../schema) }}GridId))
                .getQueryStatement(),
            constraintPaginate{{ toPascalCase (getRelationshipModuleNames this ../schema) }}: {
                where: {
                    {{ getForeignKey (object relationship=relationship schema=../schema) }}: route.paramMap.get('id'),
                },
            },
            {{/each}}
        });
    {{/eq}}
};
