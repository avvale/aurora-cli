import { EnvironmentProviders, Provider } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { translocoLoader } from './transloco-loader';

export const provideValidationMessages = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: {
                scope: 'validations',
                loader: translocoLoader,
            },
            multi: true,
        },
    ];
};
