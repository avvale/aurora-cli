/* eslint-disable max-len */
import { Route } from '@angular/router';
import { CommonComponent } from './common.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { LangEditResolver, LangNewResolver, LangPaginationResolver } from './lang/lang.resolvers';

export const commonRoutes: Route[] = [
    {
        path     : '',
        component: CommonComponent,
        children : [
            { path: 'lang', component: LangListComponent, resolve: { data: LangPaginationResolver }, data: { permission: 'common.lang.get' }},
            { path: 'lang/new', component: LangDetailComponent, resolve: { data: LangNewResolver }, data: { permission: 'common.lang.create' }},
            { path: 'lang/edit/:id', component: LangDetailComponent, resolve: { data: LangEditResolver }, data: { permission: 'common.lang.get' }},
        ],
    },
];
