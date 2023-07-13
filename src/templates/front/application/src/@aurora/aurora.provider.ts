import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { AuroraGridManagerService, AuthenticationAuroraAdapterService, AuthenticationService, BootstrapService, COMPACT_NAVIGATION, DEFAULT_NAVIGATION, FUTURISTIC_NAVIGATION, GridManagerService, HORIZONTAL_NAVIGATION, IamAuroraAdapterService, IamService, SessionLocalStorageService, SessionService, UserMetaStorageLocalStorageAdapterService, UserMetaStorageService, compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation, provideApollo, provideValidationMessages, translocoLoader } from '@aurora';

import './prototypes/string-to-camel-case.interface';
import './prototypes/string-to-camel-case';
import './prototypes/string-to-kebab-case.interface';
import './prototypes/string-to-kebab-case';
import './prototypes/string-to-pascal-case.interface';
import './prototypes/string-to-pascal-case';
import './prototypes/string-to-snake-case.interface';
import './prototypes/string-to-snake-case';

import { UserMetaStorageIamAdapterService } from 'app/modules/admin/apps/iam';

export const provideAurora = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideApollo(),
        provideValidationMessages(),
        {
            provide   : APP_INITIALIZER,
            useFactory: (bootstrapService: BootstrapService): () => void => () => bootstrapService.init(),
            deps      : [BootstrapService],
            multi     : true,
        },
        {
            provide : AuthenticationService,
            useClass: AuthenticationMockAdapterService,
        },
        {
            provide : UserMetaStorageService,
            useClass: UserMetaStorageLocalStorageAdapterService,
        },
        {
            provide : SessionService,
            useClass: SessionLocalStorageService,
        },
        {
            provide : IamService,
            useClass: IamMockAdapterService,
        },
        {
            provide : GridManagerService,
            useClass: AuroraGridManagerService,
        },
        {
            provide : COMPACT_NAVIGATION,
            useValue: compactNavigation,
        },
        {
            provide : DEFAULT_NAVIGATION,
            useValue: defaultNavigation,
        },
        {
            provide : FUTURISTIC_NAVIGATION,
            useValue: futuristicNavigation,
        },
        {
            provide : HORIZONTAL_NAVIGATION,
            useValue: horizontalNavigation,
        },
        {
            provide : EnvironmentsInformationService,
            useClass: EnvironmentsInformationMockAdapterService
        },
        {
            provide : AuthGuard,
            useClass: AuthenticationDisabledAdapterGuard
        }
    ];
};
