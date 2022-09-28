import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { {{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.moduleName }}.service';

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}PaginationResolver implements Resolve<GridData<{{ schema.aggregateName }}>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GridData<{{ schema.aggregateName }}>>
    {
        this.actionService.action({ id: '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.view' });
        return this.{{ toCamelCase schema.moduleName }}Service.pagination({
            query: QueryStatementHandler
                .fromGridStateBuilder(this.gridFiltersStorageService.getColumnFilterState('{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.mainGridList'))
                .setDefaultOrder()
                .setDefaultSlot()
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}NewResolver implements Resolve<Action>
{
    constructor(
        private readonly actionService: ActionService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Action
    {
        return this.actionService.action({ id: '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new' });
    }
}

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}EditResolver implements Resolve<{
    object: {{ schema.aggregateName }};
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        object: {{ schema.aggregateName }};
    }>
    {
        this.actionService.action({ id: '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit' });
        return this.{{ toCamelCase schema.moduleName }}Service.findById({ id: route.paramMap.get('id') });
    }
}
