import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
    imports: [
        MsalModule.forRoot(
            // MSAL Configuration
            new PublicClientApplication({
                auth: {
                    clientId   : environment.azureAd.clientId,      // Application (client) ID from the app registration
                    authority  : environment.azureAd.authority,     // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
                    redirectUri: environment.azureAd.redirectUri,   // This is your redirect URI
                },
                cache: {
                    cacheLocation         : BrowserCacheLocation.LocalStorage,
                    storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
                },
            }),
            // MSAL Guard Configuration
            {
                interactionType: InteractionType.Redirect,
                authRequest    : {
                    scopes: environment.azureAd.scopes,
                },
            },
            // TODO revisar configuración
            // MSAL Interceptor Configuration
            {
                interactionType     : InteractionType.Redirect,
                protectedResourceMap: new Map([
                    [
                        'https://graph.microsoft.com/v1.0/me',
                        environment.azureAd.scopes,
                    ],
                    [
                        environment.api.graphql,
                        environment.azureAd.scopes,
                    ],
                    [
                        'https://api.powerbi.com/v1.0/',
                        [
                            'https://analysis.windows.net/powerbi/api/Report.ReadWrite.All',
                            'https://analysis.windows.net/powerbi/api/Dataset.ReadWrite.All',
                        ],
                    ],
                    [
                        'https://pvt.azurewebsites.net/graphql',
                        environment.azureAd.scopes,
                    ],
                ]),
            },
        ),
    ],
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi   : true,
        },
    ],
    exports: [
        MsalModule,
    ],
})
export class AzureAdModule {}
