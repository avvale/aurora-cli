import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

// ---- customizations ----
import { AuthenticationService } from '@aurora';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const authenticationService: AuthenticationService = inject(AuthenticationService);

    // Check the authentication status
    return authenticationService.check().pipe(
        switchMap((authenticated) =>
        {
            // If the user is authenticated...
            if ( authenticated )
            {
                return of(router.parseUrl(''));
            }

            // allow the access
            return of(true);
        }),
    );
};
