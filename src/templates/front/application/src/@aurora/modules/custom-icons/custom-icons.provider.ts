import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { CustomIconsService } from './custom-icons.service';

export const provideCustomIcons = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(CustomIconsService),
            multi   : true,
        },
    ];
};
