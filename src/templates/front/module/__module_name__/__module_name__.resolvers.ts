import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { {{ toCamelCase schema.moduleName }}ColumnsConfig } from './{{ toKebabCase schema.moduleName }}.columns-config';
import { {{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.moduleName }}.service';
{{#each schema.properties.withWebComponents}}
import { {{ getRelationshipAggregateName }} } from '../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipBoundedContext }}.types';
import { {{ toPascalCase getRelationshipModule }}Service } from '../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/{{ toKebabCase getRelationshipModule }}.service';
{{/each}}

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
    {{/each}}
}>
{{/eq}}
{
    constructor(
        private readonly actionService: ActionService,
        {{#unlessEq schema.properties.lengthWebComponents 0 }}
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
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
    {{/each}}
    }>
{{/eq}}
    {
        {{#eq schema.properties.lengthWebComponents 0 }}return {{/eq}}this.actionService.action({
            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new',
            isViewAction: true,
        });
        {{#unlessEq schema.properties.lengthWebComponents 0 }}

        return this.{{ toCamelCase schema.moduleName }}Service.getRelations();
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
    {{/each}}
}>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
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
        {{/each}}
    }>
    {
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
        });
        {{/eq}}
    }
}
