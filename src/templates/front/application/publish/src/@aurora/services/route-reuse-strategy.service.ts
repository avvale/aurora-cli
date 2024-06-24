import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class RouteReuseStrategyService implements RouteReuseStrategy
{
    shouldDetach(route: ActivatedRouteSnapshot): boolean
    {
        return false;
    }

    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void { /**/ }

    shouldAttach(route: ActivatedRouteSnapshot): boolean
    {
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null
    {
        return null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean
    {
        // return future.routeConfig === curr.routeConfig;
        const reuse = future.data.reuse;
        if (reuse !== undefined)
        {
            return reuse;
        }
        else
        {
            return future.routeConfig === curr.routeConfig;
        }
    }
}