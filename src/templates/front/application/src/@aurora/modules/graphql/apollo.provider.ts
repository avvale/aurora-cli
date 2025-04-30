import { EnvironmentProviders, Provider, inject } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TRANSLOCO_SCOPE, TranslocoService } from '@jsverse/transloco';
import { provideApollo as provideApolloLibrary } from 'apollo-angular';
import { AuthenticationService } from '../authentication/authentication.service';
import { apolloFactory } from './apollo.factory';

export const provideApollo = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideApolloLibrary(() =>
        {
            const authenticationService = inject(AuthenticationService);
            const confirmationService = inject(FuseConfirmationService);
            const translocoService = inject(TranslocoService);

            return apolloFactory(
                authenticationService,
                confirmationService,
                translocoService,
            );
        }),
    ];
};

// From the apollo factory, try to extract the statusCode field from the error, and return the error message
// according to translation file located in assets/i18n/error/
export const provideApolloErrorTranslations = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'error',
            multi   : true,
        },
    ];
};
