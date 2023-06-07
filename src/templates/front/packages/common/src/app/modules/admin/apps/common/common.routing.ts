/* eslint-disable max-len */
import { Route } from '@angular/router';
import { CommonComponent } from './common.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { LangEditResolver, LangNewResolver, LangPaginationResolver } from './lang/lang.resolvers';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { CountryEditResolver, CountryNewResolver, CountryPaginationResolver } from './country/country.resolvers';

export const commonRoutes: Route[] = [
    {
        path     : '',
        component: CommonComponent,
        children : [
            { path: 'lang', component: LangListComponent, resolve: { data: LangPaginationResolver }, data: { permission: 'common.lang.get' }},
            { path: 'lang/new', component: LangDetailComponent, resolve: { data: LangNewResolver }, data: { permission: 'common.lang.create' }},
            { path: 'lang/edit/:id', component: LangDetailComponent, resolve: { data: LangEditResolver }, data: { permission: 'common.lang.get' }},
            { path: 'country', component: CountryListComponent, resolve: { data: CountryPaginationResolver }, data: { permission: 'common.country.get' }},
            { path: 'country/new', component: CountryDetailComponent, resolve: { data: CountryNewResolver }, data: { permission: 'common.country.create' }},
            { path: 'country/edit/:id', component: CountryDetailComponent, resolve: { data: CountryEditResolver }, data: { permission: 'common.country.get' }},
        ],
    },
];
