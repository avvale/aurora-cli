
import { Inject, Injectable } from '@angular/core';
import { RouteDefinition , ROUTE_DEFINITIONS } from './routing.types';

@Injectable({
    providedIn: 'root',
})
export class RouteRepositoryService
{
    constructor(
        @Inject(ROUTE_DEFINITIONS) private routeRepository: RouteDefinition[],
    ) { }

    route(routeName: string, params?: {[key: string]: string;}): string
    {
        if (!this.routeRepository) throw new Error(`
            You must define ROUTE_DEFINITIONS tag provider, in your app.module with your end points, for example:
            {
                provide: ROUTE_DEFINITIONS,
                useValue: routeRepository,
            }`);

        const routeMatch  = this.routeRepository.find(route => route.name === routeName) as RouteDefinition;

        if (!routeMatch) throw new Error(`The routeName ${routeName} not exist in your route repository`);

        return this.interpolate(routeMatch.route, params);
    }

    private interpolate(route: string, params?: {[key: string]: string;}): string
    {
        return params ? Object.keys(params)
            .reduce((accumulator, currentValue) =>
                accumulator.replace(`:${currentValue}`, params[currentValue]), route) : route;
    }
}
