import { FuseNavigationItem } from '@fuse/components/navigation';

export const oAuthNavigation: FuseNavigationItem = {
    id   : 'oAuth',
    title: 'OAuth',
    type : 'collapsable',
    icon : 'heroicons_outline:tag',
    meta : {
        permission: 'oAuth.access',
    },
    children: [
        {
            id   : 'scopes',
            title: 'Scope',
            type : 'basic',
            icon : 'ads_click',
            link : '/o-auth/scope',
            meta : {
                permission: 'oAuth.scope.access',
            },
        },
        {
            id   : 'applications',
            title: 'Application',
            type : 'basic',
            icon : 'apps',
            link : '/o-auth/application',
            meta : {
                permission: 'oAuth.application.access',
            },
        },
        {
            id   : 'clients',
            title: 'Client',
            type : 'basic',
            icon : 'workspaces',
            link : '/o-auth/client',
            meta : {
                permission: 'oAuth.client.access',
            },
        },
        {
            id   : 'accessTokens',
            title: 'AccessToken',
            type : 'basic',
            icon : 'password',
            link : '/o-auth/access-token',
            meta : {
                permission: 'oAuth.accessToken.access',
            },
        },
        {
            id   : 'refreshTokens',
            title: 'RefreshToken',
            type : 'basic',
            icon : 'password',
            link : '/o-auth/refresh-token',
            meta : {
                permission: 'oAuth.refreshToken.access',
            },
        },
    ],
};