/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { CommonComponent } from './common.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { countryEditResolver, countryNewResolver, countryPaginationResolver } from './country/country.resolvers';
import { LangDetailComponent } from './lang/lang-detail.component';
import { LangListComponent } from './lang/lang-list.component';
import { langEditResolver, langNewResolver, langPaginationResolver } from './lang/lang.resolvers';
import { AdministrativeAreaLevel1ListComponent } from './administrative-area-level-1/administrative-area-level-1-list.component';
import { AdministrativeAreaLevel1DetailComponent } from './administrative-area-level-1/administrative-area-level-1-detail.component';
import { administrativeAreaLevel1EditResolver, administrativeAreaLevel1NewResolver, administrativeAreaLevel1PaginationResolver } from './administrative-area-level-1/administrative-area-level-1.resolvers';
import { AdministrativeAreaLevel2ListComponent } from './administrative-area-level-2/administrative-area-level-2-list.component';
import { AdministrativeAreaLevel2DetailComponent } from './administrative-area-level-2/administrative-area-level-2-detail.component';
import { administrativeAreaLevel2EditResolver, administrativeAreaLevel2NewResolver, administrativeAreaLevel2PaginationResolver } from './administrative-area-level-2/administrative-area-level-2.resolvers';
import { AdministrativeAreaLevel3ListComponent } from './administrative-area-level-3/administrative-area-level-3-list.component';
import { AdministrativeAreaLevel3DetailComponent } from './administrative-area-level-3/administrative-area-level-3-detail.component';
import { administrativeAreaLevel3EditResolver, administrativeAreaLevel3NewResolver, administrativeAreaLevel3PaginationResolver } from './administrative-area-level-3/administrative-area-level-3.resolvers';
import { ResourceListComponent } from './resource/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail.component';
import { resourceEditResolver, resourceNewResolver, resourcePaginationResolver } from './resource/resource.resolvers';
import { AttachmentFamilyListComponent } from './attachment-family/attachment-family-list.component';
import { AttachmentFamilyDetailComponent } from './attachment-family/attachment-family-detail.component';
import { attachmentFamilyEditResolver, attachmentFamilyNewResolver, attachmentFamilyPaginationResolver } from './attachment-family/attachment-family.resolvers';

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
            { path: 'administrative-area-level-1', component: AdministrativeAreaLevel1ListComponent, resolve: { data: administrativeAreaLevel1PaginationResolver }, data: { permission: 'common.administrativeAreaLevel1.get' }},
            { path: 'administrative-area-level-1/new', component: AdministrativeAreaLevel1DetailComponent, resolve: { data: administrativeAreaLevel1NewResolver }, data: { permission: 'common.administrativeAreaLevel1.create' }},
            { path: 'administrative-area-level-1/edit/:id', component: AdministrativeAreaLevel1DetailComponent, resolve: { data: administrativeAreaLevel1EditResolver }, data: { permission: 'common.administrativeAreaLevel1.get' }},
            { path: 'administrative-area-level-2', component: AdministrativeAreaLevel2ListComponent, resolve: { data: administrativeAreaLevel2PaginationResolver }, data: { permission: 'common.administrativeAreaLevel2.get' }},
            { path: 'administrative-area-level-2/new', component: AdministrativeAreaLevel2DetailComponent, resolve: { data: administrativeAreaLevel2NewResolver }, data: { permission: 'common.administrativeAreaLevel2.create' }},
            { path: 'administrative-area-level-2/edit/:id', component: AdministrativeAreaLevel2DetailComponent, resolve: { data: administrativeAreaLevel2EditResolver }, data: { permission: 'common.administrativeAreaLevel2.get' }},
            { path: 'administrative-area-level-3', component: AdministrativeAreaLevel3ListComponent, resolve: { data: administrativeAreaLevel3PaginationResolver }, data: { permission: 'common.administrativeAreaLevel3.get' }},
            { path: 'administrative-area-level-3/new', component: AdministrativeAreaLevel3DetailComponent, resolve: { data: administrativeAreaLevel3NewResolver }, data: { permission: 'common.administrativeAreaLevel3.create' }},
            { path: 'administrative-area-level-3/edit/:id', component: AdministrativeAreaLevel3DetailComponent, resolve: { data: administrativeAreaLevel3EditResolver }, data: { permission: 'common.administrativeAreaLevel3.get' }},
            { path: 'resource', component: ResourceListComponent, resolve: { data: resourcePaginationResolver }, data: { permission: 'common.resource.get' }},
            { path: 'resource/new', component: ResourceDetailComponent, resolve: { data: resourceNewResolver }, data: { permission: 'common.resource.create' }},
            { path: 'resource/edit/:id', component: ResourceDetailComponent, resolve: { data: resourceEditResolver }, data: { permission: 'common.resource.get' }},
            { path: 'attachment-family', component: AttachmentFamilyListComponent, resolve: { data: attachmentFamilyPaginationResolver }, data: { permission: 'common.attachmentFamily.get' }},
            { path: 'attachment-family/new', component: AttachmentFamilyDetailComponent, resolve: { data: attachmentFamilyNewResolver }, data: { permission: 'common.attachmentFamily.create' }},
            { path: 'attachment-family/edit/:id', component: AttachmentFamilyDetailComponent, resolve: { data: attachmentFamilyEditResolver }, data: { permission: 'common.attachmentFamily.get' }},
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
