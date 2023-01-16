import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';

// ---- customizations ----
import { AuthenticationService, AuthorizationService, log } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanMatch, CanActivate, CanActivateChild
{
    /**
     * Constructor
     */
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly authorizationService: AuthorizationService,
        private readonly router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        // check permissions routes
        if (!this.checkAuthorization(route.data.permission)) return false;

        return this.checkAuthentication(route.url);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // check permissions routes
        if (!this.checkAuthorization(childRoute.data.permission)) return false;

        return this.checkAuthentication(childRoute.url);
    }

    /**
     * Can match
     *
     * @param route
     * @param segments
     */
    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this.checkAuthentication(segments);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param segments
     * @private
     */
    private async checkAuthentication(segments: UrlSegment[]): Promise<boolean>
    {
        // Check the authentication status
        if (await lastValueFrom(this.authenticationService.check()))
        {
            return true;
        }
        else
        {
            log('[DEBUG] AuthGuard denies access to the route, redirect to sign-in');

            // Redirect to the sign-in page
            const redirectURL = `/${segments.join('/')}`;
            this.router.navigate(['sign-in'], { queryParams: { redirectURL }});

            // Prevent the access
            return false;
        }
    }

    /**
     * Check the authorization status
     *
     * @param permissions
     * @private
     */
    private checkAuthorization(permissions: string | string[]): boolean
    {
        // check permissions routes
        if (!this.authorizationService.can(permissions))
        {
            this.router.navigate(['error/401']);

            return false;
        }

        return true;
    }
}
