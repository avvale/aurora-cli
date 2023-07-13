import { FuseNavigationItem } from '@fuse/components/navigation';

export const oAuthNavigation: FuseNavigationItem = {
    id   : 'oAuth',
    title: 'OAuth',
    type : 'collapsable',
    icon : 'mat_outline:security',
    meta : {
        permission: 'oAuth.access',
    },
    children: [
        {
            id   : 'scopes',
            title: 'Scope',
            type : 'basic',
            icon : 'mat_outline:ads_click',
            link : '/o-auth/scope',
            meta : {
                permission: 'oAuth.scope.access',
            },
        },
        {
            id   : 'applications',
            title: 'Application',
            type : 'basic',
            icon : 'mat_outline:apps',
            link : '/o-auth/application',
            meta : {
                permission: 'oAuth.application.access',
            },
        },
        {
            id   : 'clients',
            title: 'Client',
            type : 'basic',
            icon : 'mat_outline:workspaces',
            link : '/o-auth/client',
            meta : {
                permission: 'oAuth.client.access',
            },
        },
        {
            id   : 'accessTokens',
            title: 'AccessToken',
            type : 'basic',
            icon : 'mat_outline:password',
            link : '/o-auth/access-token',
            meta : {
                permission: 'oAuth.accessToken.access',
            },
        },
        {
            id   : 'refreshTokens',
            title: 'RefreshToken',
            type : 'basic',
            icon : 'mat_outline:password',
            link : '/o-auth/refresh-token',
            meta : {
                permission: 'oAuth.refreshToken.access',
            },
        },
    ],
};