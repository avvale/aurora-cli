import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { AuroraGridManagerService, AuroraModule, AuthenticationAuroraAdapterService, AuthenticationDisabledAdapterGuard, AuthenticationService, COMPACT_NAVIGATION, DEFAULT_NAVIGATION, EnvironmentsInformationService, FUTURISTIC_NAVIGATION, GridManagerService, HORIZONTAL_NAVIGATION, IamAuroraAdapterService, IamService, JsonLangService, LangService, RibbonEnvironmentModule, RouteReuseStrategyService, SessionLocalStorageService, SessionService, UserMetaStorageLocalStorageAdapterService, UserMetaStorageService } from '@aurora';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from './core/navigation/default-navigation';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // Aurora front module
        AuroraModule,
        RibbonEnvironmentModule,
    ],
    providers: [
        {
            provide    : LangService,
            useExisting: JsonLangService,
        },
        {
            provide : AuthenticationService,
            useClass: AuthenticationMockAdapterService,
        },
        {
            provide : EnvironmentsInformationService,
            useClass: EnvironmentsInformationMockAdapterService,
        },
        {
            provide : RouteReuseStrategy,
            useClass: RouteReuseStrategyService,
        },
        {
            provide : UserMetaStorageService,
            useClass: UserMetaStorageLocalStorageService,
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
        // disable authentication Guard
        {
            provide : AuthGuard,
            useClass: AuthenticationDisabledAdapterGuard,
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule
{
}
