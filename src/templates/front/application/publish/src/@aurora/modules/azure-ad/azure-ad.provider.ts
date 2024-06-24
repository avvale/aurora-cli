import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { AuthenticationService, AuthorizationService, IamService, log } from '@aurora';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { environment } from 'environments/environment';
import { AuthenticationAzureAdAdapterService } from './authentication-azure-ad-adapter.service';
import { AuthorizationAzureAdAdapterService } from './authorization-azure-ad-adapter.service';
import { IamAzureAdAdapterService } from './iam-azure-ad-adapter.service';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string): void
{
    log('[DEBUG] Azure AD MSAL: ', message);
}

export function MSALInstanceFactory(): IPublicClientApplication
{
    return new PublicClientApplication({
        auth: {
            clientId   : environment.azureAd.clientId,      // Application (client) ID from the app registration
            authority  : environment.azureAd.authority,     // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
            redirectUri: environment.azureAd.redirectUri,   // This is your redirect URI
            // postLogoutRedirectUri: '/',
        },
        cache: {
            cacheLocation         : BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
        },
        system: {
            allowNativeBroker: false, // Disables WAM Broker
            loggerOptions    : {
                loggerCallback,
                logLevel         : LogLevel.Info,
                piiLoggingEnabled: false,
            },
        },
    });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration
{
    const protectedResourceMap = new Map<string, Array<string>>();

    protectedResourceMap.set(
        environment.api.graphql,
        environment.azureAd.scopes,
    );

    protectedResourceMap.set(
        'https://graph.microsoft.com/v1.0/me',
        environment.azureAd.scopes,
    );

    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap,
    };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration
{
    return {
        interactionType: InteractionType.Redirect,
        authRequest    : {
            scopes: [
                ...environment.azureAd.scopes,
            ],
        },
        loginFailedRoute: '/login-failed',
    };
}

export const provideAzureAd = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi   : true,
        },
        {
            provide   : MSAL_INSTANCE,
            useFactory: MSALInstanceFactory,
        },
        {
            provide   : MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory,
        },
        {
            provide   : MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory,
        },
        {
            provide    : AuthGuard,
            useExisting: MsalGuard,
        },
        {
            provide : AuthenticationService,
            useClass: AuthenticationAzureAdAdapterService,
        },
        {
            provide : AuthorizationService,
            useClass: AuthorizationAzureAdAdapterService,
        },
        {
            provide : IamService,
            useClass: IamAzureAdAdapterService,
        },
        MsalGuard,
        MsalService,
        MsalBroadcastService,
    ];
};
