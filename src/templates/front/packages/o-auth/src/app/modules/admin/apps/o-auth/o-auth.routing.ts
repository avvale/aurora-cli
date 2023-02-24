/* eslint-disable max-len */
import { Route } from '@angular/router';
import { OAuthComponent } from './o-auth.component';
import { ScopeListComponent } from './scope/scope-list.component';
import { ScopeDetailComponent } from './scope/scope-detail.component';
import { ScopeEditResolver, ScopeNewResolver, ScopePaginationResolver } from './scope/scope.resolvers';
import { ApplicationListComponent } from './application/application-list.component';
import { ApplicationDetailComponent } from './application/application-detail.component';
import { ApplicationEditResolver, ApplicationNewResolver, ApplicationPaginationResolver } from './application/application.resolvers';
import { ClientListComponent } from './client/client-list.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { ClientEditResolver, ClientNewResolver, ClientPaginationResolver } from './client/client.resolvers';
import { AccessTokenListComponent } from './access-token/access-token-list.component';
import { AccessTokenDetailComponent } from './access-token/access-token-detail.component';
import { AccessTokenEditResolver, AccessTokenNewResolver, AccessTokenPaginationResolver } from './access-token/access-token.resolvers';
import { RefreshTokenListComponent } from './refresh-token/refresh-token-list.component';
import { RefreshTokenDetailComponent } from './refresh-token/refresh-token-detail.component';
import { RefreshTokenEditResolver, RefreshTokenNewResolver, RefreshTokenPaginationResolver } from './refresh-token/refresh-token.resolvers';

export const oAuthRoutes: Route[] = [
    {
        path     : '',
        component: OAuthComponent,
        children : [
            { path: 'scope', component: ScopeListComponent, resolve: { data: ScopePaginationResolver }, data: { permission: 'oAuth.scope.get' }},
            { path: 'scope/new', component: ScopeDetailComponent, resolve: { data: ScopeNewResolver }, data: { permission: 'oAuth.scope.create' }},
            { path: 'scope/edit/:id', component: ScopeDetailComponent, resolve: { data: ScopeEditResolver }, data: { permission: 'oAuth.scope.get' }},
            { path: 'application', component: ApplicationListComponent, resolve: { data: ApplicationPaginationResolver }, data: { permission: 'oAuth.application.get' }},
            { path: 'application/new', component: ApplicationDetailComponent, resolve: { data: ApplicationNewResolver }, data: { permission: 'oAuth.application.create' }},
            { path: 'application/edit/:id', component: ApplicationDetailComponent, resolve: { data: ApplicationEditResolver }, data: { permission: 'oAuth.application.get' }},
            { path: 'client', component: ClientListComponent, resolve: { data: ClientPaginationResolver }, data: { permission: 'oAuth.client.get' }},
            { path: 'client/new', component: ClientDetailComponent, resolve: { data: ClientNewResolver }, data: { permission: 'oAuth.client.create' }},
            { path: 'client/edit/:id', component: ClientDetailComponent, resolve: { data: ClientEditResolver }, data: { permission: 'oAuth.client.get' }},
            { path: 'access-token', component: AccessTokenListComponent, resolve: { data: AccessTokenPaginationResolver }, data: { permission: 'oAuth.accessToken.get' }},
            { path: 'access-token/new', component: AccessTokenDetailComponent, resolve: { data: AccessTokenNewResolver }, data: { permission: 'oAuth.accessToken.create' }},
            { path: 'access-token/edit/:id', component: AccessTokenDetailComponent, resolve: { data: AccessTokenEditResolver }, data: { permission: 'oAuth.accessToken.get' }},
            { path: 'refresh-token', component: RefreshTokenListComponent, resolve: { data: RefreshTokenPaginationResolver }, data: { permission: 'oAuth.refreshToken.get' }},
            { path: 'refresh-token/new', component: RefreshTokenDetailComponent, resolve: { data: RefreshTokenNewResolver }, data: { permission: 'oAuth.refreshToken.create' }},
            { path: 'refresh-token/edit/:id', component: RefreshTokenDetailComponent, resolve: { data: RefreshTokenEditResolver }, data: { permission: 'oAuth.refreshToken.get' }},
        ],
    },
];
