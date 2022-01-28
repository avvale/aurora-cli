import { InjectionToken } from '@angular/core';

export const ROUTE_DEFINITIONS = new InjectionToken<RouteDefinition[]>('route.definitions');

export interface RouteDefinition
{
    name     : string;
    route    : string;
}
