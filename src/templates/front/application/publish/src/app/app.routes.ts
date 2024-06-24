import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        // prettier-ignore
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        // prettier-ignore
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes') },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.routes'),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        // prettier-ignore
        children: [
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes') },
            { path: 'common', loadChildren: () => import('app/modules/admin/apps/common/common.routes') },
            { path: 'queue-manager', loadChildren: () => import('app/modules/admin/apps/queue-manager/queue-manager.routes') },
            { path: 'auditing', loadChildren: () => import('app/modules/admin/apps/auditing/auditing.routes') },
            { path: 'o-auth', loadChildren: () => import('app/modules/admin/apps/o-auth/o-auth.routes') },
            { path: 'iam', loadChildren: () => import('app/modules/admin/apps/iam/iam.routes') },
            { path: 'search-engine', loadChildren: () => import('app/modules/admin/apps/search-engine/search-engine.routes') },
            { path: 'kitchen-sink', loadChildren: () => import('app/modules/admin/kitchen-sink/kitchen-sink.routes') },
            { path: 'message', loadChildren: () => import('app/modules/admin/apps/message/message.routes') },
            { path: 'settings', loadChildren: () => import('@apps/settings/settings.routes') },
        ],
    },

    // Error routes
    {
        path: 'error/404',
        loadChildren: () =>
            import('app/modules/admin/pages/error/error-404/error-404.routes'),
    },
    {
        path: 'error/401',
        loadChildren: () =>
            import('app/modules/admin/pages/error/error-401/error-401.routes'),
    },
    {
        path: 'error/500',
        loadChildren: () =>
            import('app/modules/admin/pages/error/error-500/error-500.routes'),
    },
    {
        path: '**',
        redirectTo: 'error/404',
    },
];
