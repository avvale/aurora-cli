/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { ToolsComponent } from './tools.component';
import { KeyValueListComponent } from './key-value/key-value-list.component';
import { KeyValueDetailComponent } from './key-value/key-value-detail.component';
import { keyValueEditResolver, keyValueNewResolver, keyValuePaginationResolver } from './key-value/key-value.resolvers';
import { ProcedureListComponent } from './procedure/procedure-list.component';
import { ProcedureDetailComponent } from './procedure/procedure-detail.component';
import { procedureEditResolver, procedureNewResolver, procedurePaginationResolver } from './procedure/procedure.resolvers';
import { MigrationListComponent } from './migration/migration-list.component';
import { MigrationDetailComponent } from './migration/migration-detail.component';
import { migrationEditResolver, migrationNewResolver, migrationPaginationResolver } from './migration/migration.resolvers';

export default [
    {
        path     : '',
        component: ToolsComponent,
        children : [
            { path: 'key-value', component: KeyValueListComponent, resolve: { data: keyValuePaginationResolver }, data: { permission: 'tools.keyValue.get' }},
            { path: 'key-value/new', component: KeyValueDetailComponent, resolve: { data: keyValueNewResolver }, data: { permission: 'tools.keyValue.create' }},
            { path: 'key-value/edit/:id', component: KeyValueDetailComponent, resolve: { data: keyValueEditResolver }, data: { permission: 'tools.keyValue.get' }},
            { path: 'procedure', component: ProcedureListComponent, resolve: { data: procedurePaginationResolver }, data: { permission: 'tools.procedure.get' }},
            { path: 'procedure/new', component: ProcedureDetailComponent, resolve: { data: procedureNewResolver }, data: { permission: 'tools.procedure.create' }},
            { path: 'procedure/edit/:id', component: ProcedureDetailComponent, resolve: { data: procedureEditResolver }, data: { permission: 'tools.procedure.get' }},
            { path: 'migration', component: MigrationListComponent, resolve: { data: migrationPaginationResolver }, data: { permission: 'tools.migration.get' }},
            { path: 'migration/new', component: MigrationDetailComponent, resolve: { data: migrationNewResolver }, data: { permission: 'tools.migration.create' }},
            { path: 'migration/edit/:id', component: MigrationDetailComponent, resolve: { data: migrationEditResolver }, data: { permission: 'tools.migration.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'tools',
                multi   : true,
            },
        ],
    },
];
