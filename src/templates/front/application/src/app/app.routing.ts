import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path     : '',
        canMatch : [NoAuthGuard],
        component: LayoutComponent,
        data     : {
            layout: 'empty',
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
        ],
    },

    // Auth routes for authenticated users
    {
        path            : '',
        canActivate     : [AuthGuard],
        canActivateChild: [AuthGuard],
        component       : LayoutComponent,
        data            : {
            layout: 'empty',
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) },
        ],
    },

    // Landing routes
    {
        path     : '',
        component: LayoutComponent,
        data     : {
            layout: 'empty',
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ],
    },

    // Admin routes
    {
        path            : '',
        canActivate     : [AuthGuard],
        canActivateChild: [AuthGuard],
        component       : LayoutComponent,
        resolve         : {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
            { path: 'kitchen-sink', loadChildren: () => import('app/modules/admin/kitchen-sink/kitchen-sink.module').then(m => m.KitchenSinkModule) },

            // add here your module routes
        ],
    },

    // Error routes
    {
        path        : 'error/404',
        loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module),
    },
    {
        path        : 'error/401',
        loadChildren: () => import('app/modules/admin/pages/error/error-401/error-401.module').then(m => m.Error401Module),
    },
    {
        path        : 'error/500',
        loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module),
    },
    {
        path      : '**',
        redirectTo: 'error/404',
    },
];
