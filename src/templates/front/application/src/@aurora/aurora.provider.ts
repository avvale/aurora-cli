import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { AuroraGridManagerService, AuthenticationAuroraAdapterService, AuthenticationDisabledAdapterGuard, AuthenticationMockAdapterService, AuthenticationService, AuthorizationDisabledService, AuthorizationService, BootstrapService, COMPACT_NAVIGATION, DEFAULT_NAVIGATION, EnvironmentsInformationMockAdapterService, EnvironmentsInformationService, FUTURISTIC_NAVIGATION, GridManagerService, HORIZONTAL_NAVIGATION, IamAuroraAdapterService, IamMockAdapterService, IamService, SessionLocalStorageService, SessionService, UserMetaStorageLocalStorageAdapterService, UserMetaStorageService, compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation, provideApollo, provideValidationMessages } from '@aurora';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import './aurora.prototypes';

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
        },
        {
            provide : AuthorizationService,
            useClass: AuthorizationDisabledService
        }
    ];
};
