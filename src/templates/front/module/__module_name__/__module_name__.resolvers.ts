import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData } from '@aurora';
import { Observable } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { {{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.moduleName }}.service';

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}PaginationResolver implements Resolve<GridData<{{ schema.aggregateName }}>>
{
    constructor(
        private {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GridData<{{ schema.aggregateName }}>>
    {
        return this.{{ toCamelCase schema.moduleName }}Service.pagination();
    }
}

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}NewResolver implements Resolve<Action>
{
    constructor(
        private actionService: ActionService,
    )
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Action
    {
        return this.actionService.action({ id: 'new' });
    }
}

@Injectable({
    providedIn: 'root',
})
export class {{ toPascalCase schema.moduleName }}EditResolver implements Resolve<{{ schema.aggregateName }}>
{
    constructor(
        private actionService: ActionService,
        private {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    )
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{{ schema.aggregateName }}>
    {
        this.actionService.action({ id: 'edit' });
        return this.{{ toCamelCase schema.moduleName }}Service.findById({ id: route.paramMap.get('id') });
    }
}
