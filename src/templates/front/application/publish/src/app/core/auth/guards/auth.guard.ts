import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

// ---- customizations ----
import { AuthenticationService, AuthorizationService, log } from '@aurora';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const authenticationService: AuthenticationService = inject(
        AuthenticationService
    );
    const authorizationService: AuthorizationService =
        inject(AuthorizationService);

    // Check the authentication status
    return authenticationService.check().pipe(
        switchMap((authenticated) => {
            // If the user is not authenticated...
            if (!authenticated) {
                log(
                    '[DEBUG] AuthGuard denies access to the route, redirect to sign-in'
                );

                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL =
                    state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }

            // check the authorization status
            if (!authorizationService.can(route.data.permission)) {
                const urlTree = router.parseUrl('error/401');

                return of(urlTree);
            }

            // Allow the access
            return of(true);
        })
    );
};
