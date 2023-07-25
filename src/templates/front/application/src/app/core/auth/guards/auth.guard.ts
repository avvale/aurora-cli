import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router, UrlSegment } from '@angular/router';
import { of, switchMap } from 'rxjs';

// ---- customizations ----
import { AuthenticationService, AuthorizationService, log } from '@aurora';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    const authorizationService: AuthorizationService = inject(AuthorizationService);

    return authenticationService.check().pipe(
        switchMap(authenticated =>
        {
            // check the authentication status
            if (!authenticated)
            {
                log('[DEBUG] AuthGuard denies access to the route, redirect to sign-in');
                // Redirect to the sign-in page
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }

            // check the authorization status
            if (!authorizationService.can(route.data.permission))
            {
                const urlTree = router.parseUrl('error/401');

                return of(urlTree);
            }

            // allow the access
            return of(true);
        })
    );
};
