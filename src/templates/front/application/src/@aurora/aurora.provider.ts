import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuroraGridManagerService, AuthenticationAuroraAdapterService, AuthenticationService, BootstrapService, COMPACT_NAVIGATION, DEFAULT_NAVIGATION, DatePickerDayjsAdapter, DatePickerDayjsFormats, DateTimePickerDayjsAdapter, DatetimePickerDayjsFormats, FUTURISTIC_NAVIGATION, GridManagerService, HORIZONTAL_NAVIGATION, IamAuroraAdapterService, IamService, PaginatorIntlService, SessionLocalStorageService, SessionService, UserMetaStorageService, compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation, provideApollo, provideCustomIcons, provideValidationMessages } from '@aurora';
import { DatetimeAdapter, MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import './aurora.prototypes';

export const provideAurora = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideApollo(),
        provideValidationMessages(),
        provideCustomIcons(),
        {
            provide   : APP_INITIALIZER,
            useFactory: (bootstrapService: BootstrapService): () => void => () => bootstrapService.init(),
            deps      : [BootstrapService],
            multi     : true,
        },
        {
            provide : MatPaginatorIntl,
            useClass: PaginatorIntlService,
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
            provide : DateAdapter,
            useClass: DatePickerDayjsAdapter,
            deps    : [MAT_DATE_LOCALE],
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: DatePickerDayjsFormats,
        },
        {
            provide : DatetimeAdapter,
            useClass: DateTimePickerDayjsAdapter,
        },
        {
            provide : MTX_DATETIME_FORMATS,
            useValue: DatetimePickerDayjsFormats,
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
