import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { AuthenticationService, AuthorizationService, IamService, log } from '@aurora';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { environment } from 'environments/environment';
import { AuthenticationMsEntraIdAdapterService } from './authentication-ms-entra-id-adapter.service';
import { IamMsEntraIdAdapterService } from './iam-ms-entra-id-adapter.service';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication
{
    return new PublicClientApplication({
        auth: {
            clientId   : environment.msEntraId.clientId,      // Application (client) ID from the app registration
            authority  : environment.msEntraId.authority,     // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
            redirectUri: environment.msEntraId.redirectUri,   // This is your redirect URI
            postLogoutRedirectUri: '/',
        },
        cache: {
            cacheLocation         : BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
        },
        system: {
            loggerOptions    : {
                loggerCallback   : (logLevel: LogLevel, message: string) => log('[DEBUG] MS Entra Id V1: ', message),
                logLevel         : LogLevel.Error,
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
        environment.msEntraId.scopes,
    );

    protectedResourceMap.set(
        environment.api.rest,
        environment.msEntraId.scopes,
    );

    protectedResourceMap.set(
        'https://graph.microsoft.com/v1.0/me',
        environment.msEntraId.scopes,
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
                ...environment.msEntraId.scopes,
            ],
        },
        loginFailedRoute: '/login-failed',
    };
}

export const provideMsEntraId = (): Array<Provider | EnvironmentProviders> =>
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
            useClass: AuthenticationMsEntraIdAdapterService,
        },
        {
            provide : IamService,
            useClass: IamMsEntraIdAdapterService,
        },
        MsalGuard,
        MsalService,
        MsalBroadcastService,
    ];
};
