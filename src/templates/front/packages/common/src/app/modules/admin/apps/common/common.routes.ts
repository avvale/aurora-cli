/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { CommonComponent } from './common.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { countryEditResolver, countryNewResolver, countryPaginationResolver } from './country/country.resolvers';
import { LangDetailComponent } from './lang/lang-detail.component';
import { LangListComponent } from './lang/lang-list.component';
import { langEditResolver, langNewResolver, langPaginationResolver } from './lang/lang.resolvers';

export default [
    {
        path     : '',
        component: CommonComponent,
        children : [
            { path: 'lang', component: LangListComponent, resolve: { data: langPaginationResolver }, data: { permission: 'common.lang.get' }},
            { path: 'lang/new', component: LangDetailComponent, resolve: { data: langNewResolver }, data: { permission: 'common.lang.create' }},
            { path: 'lang/edit/:id', component: LangDetailComponent, resolve: { data: langEditResolver }, data: { permission: 'common.lang.get' }},
            { path: 'country', component: CountryListComponent, resolve: { data: countryPaginationResolver }, data: { permission: 'common.country.get' }},
            { path: 'country/new', component: CountryDetailComponent, resolve: { data: countryNewResolver }, data: { permission: 'common.country.create' }},
            { path: 'country/new/:id/:langId', component: CountryDetailComponent, resolve: { data: countryNewResolver }, data: { permission: 'common.country.create' }},
            { path: 'country/edit/:id/:langId', component: CountryDetailComponent, resolve: { data: countryEditResolver }, data: { permission: 'common.country.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'common',
                multi   : true,
            },
        ],
    },
];
