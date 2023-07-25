/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SearchEngineComponent } from './search-engine.component';
import { CollectionListComponent } from './collection/collection-list.component';
import { CollectionDetailComponent } from './collection/collection-detail.component';
import { collectionEditResolver, collectionNewResolver, collectionPaginationResolver } from './collection/collection.resolvers';
import { FieldListComponent } from './field/field-list.component';
import { FieldDetailComponent } from './field/field-detail.component';
import { fieldEditResolver, fieldNewResolver, fieldPaginationResolver } from './field/field.resolvers';

export default [
    {
        path     : '',
        component: SearchEngineComponent,
        children : [
            { path: 'collection', component: CollectionListComponent, resolve: { data: collectionPaginationResolver }, data: { permission: 'searchEngine.collection.get' }},
            { path: 'collection/new', component: CollectionDetailComponent, resolve: { data: collectionNewResolver }, data: { permission: 'searchEngine.collection.create' }},
            { path: 'collection/edit/:id', component: CollectionDetailComponent, resolve: { data: collectionEditResolver }, data: { permission: 'searchEngine.collection.get' }},
            { path: 'field', component: FieldListComponent, resolve: { data: fieldPaginationResolver }, data: { permission: 'searchEngine.field.get' }},
            { path: 'field/new', component: FieldDetailComponent, resolve: { data: fieldNewResolver }, data: { permission: 'searchEngine.field.create' }},
            { path: 'field/edit/:id', component: FieldDetailComponent, resolve: { data: fieldEditResolver }, data: { permission: 'searchEngine.field.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'search-engine',
                multi   : true,
            },
        ],
    },
];
