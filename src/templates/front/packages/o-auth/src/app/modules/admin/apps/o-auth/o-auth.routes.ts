/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { OAuthComponent } from './o-auth.component';
import { AccessTokenListComponent } from './access-token/access-token-list.component';
import { AccessTokenDetailComponent } from './access-token/access-token-detail.component';
import { accessTokenEditResolver, accessTokenNewResolver, accessTokenPaginationResolver } from './access-token/access-token.resolvers';
import { RefreshTokenListComponent } from './refresh-token/refresh-token-list.component';
import { RefreshTokenDetailComponent } from './refresh-token/refresh-token-detail.component';
import { refreshTokenEditResolver, refreshTokenNewResolver, refreshTokenPaginationResolver } from './refresh-token/refresh-token.resolvers';
import { ScopeListComponent } from './scope/scope-list.component';
import { ScopeDetailComponent } from './scope/scope-detail.component';
import { scopeEditResolver, scopeNewResolver, scopePaginationResolver } from './scope/scope.resolvers';
import { ApplicationListComponent } from './application/application-list.component';
import { ApplicationDetailComponent } from './application/application-detail.component';
import { applicationEditResolver, applicationNewResolver, applicationPaginationResolver } from './application/application.resolvers';
import { ClientListComponent } from './client/client-list.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { clientEditResolver, clientNewResolver, clientPaginationResolver } from './client/client.resolvers';

export default [
    {
        path     : '',
        component: OAuthComponent,
        children : [
            { path: 'access-token', component: AccessTokenListComponent, resolve: { data: accessTokenPaginationResolver }, data: { permission: ['oAuth.accessToken.get', 'oAuth.accessToken.access'] }},
            { path: 'access-token/new', component: AccessTokenDetailComponent, resolve: { data: accessTokenNewResolver }, data: { permission: ['oAuth.accessToken.create', 'oAuth.accessToken.access'] }},
            { path: 'access-token/edit/:id', component: AccessTokenDetailComponent, resolve: { data: accessTokenEditResolver }, data: { permission: ['oAuth.accessToken.get', 'oAuth.accessToken.access'] }},
            { path: 'refresh-token', component: RefreshTokenListComponent, resolve: { data: refreshTokenPaginationResolver }, data: { permission: ['oAuth.refreshToken.get', 'oAuth.refreshToken.access'] }},
            { path: 'refresh-token/new', component: RefreshTokenDetailComponent, resolve: { data: refreshTokenNewResolver }, data: { permission: ['oAuth.refreshToken.create', 'oAuth.refreshToken.access'] }},
            { path: 'refresh-token/edit/:id', component: RefreshTokenDetailComponent, resolve: { data: refreshTokenEditResolver }, data: { permission: ['oAuth.refreshToken.get', 'oAuth.refreshToken.access'] }},
            { path: 'scope', component: ScopeListComponent, resolve: { data: scopePaginationResolver }, data: { permission: ['oAuth.scope.get', 'oAuth.scope.access'] }},
            { path: 'scope/new', component: ScopeDetailComponent, resolve: { data: scopeNewResolver }, data: { permission: ['oAuth.scope.create', 'oAuth.scope.access'] }},
            { path: 'scope/edit/:id', component: ScopeDetailComponent, resolve: { data: scopeEditResolver }, data: { permission: ['oAuth.scope.get', 'oAuth.scope.access'] }},
            { path: 'application', component: ApplicationListComponent, resolve: { data: applicationPaginationResolver }, data: { permission: ['oAuth.application.get', 'oAuth.application.access'] }},
            { path: 'application/new', component: ApplicationDetailComponent, resolve: { data: applicationNewResolver }, data: { permission: ['oAuth.application.create', 'oAuth.application.access'] }},
            { path: 'application/edit/:id', component: ApplicationDetailComponent, resolve: { data: applicationEditResolver }, data: { permission: ['oAuth.application.get', 'oAuth.application.access'] }},
            { path: 'client', component: ClientListComponent, resolve: { data: clientPaginationResolver }, data: { permission: ['oAuth.client.get', 'oAuth.client.access'] }},
            { path: 'client/new', component: ClientDetailComponent, resolve: { data: clientNewResolver }, data: { permission: ['oAuth.client.create', 'oAuth.client.access'] }},
            { path: 'client/edit/:id', component: ClientDetailComponent, resolve: { data: clientEditResolver }, data: { permission: ['oAuth.client.get', 'oAuth.client.access'] }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'o-auth',
                multi   : true,
            },
        ],
    },
];
