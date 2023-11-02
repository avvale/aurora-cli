/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { IamComponent } from './iam.component';
import { TenantListComponent } from './tenant/tenant-list.component';
import { TenantDetailComponent } from './tenant/tenant-detail.component';
import { tenantEditResolver, tenantNewResolver, tenantPaginationResolver } from './tenant/tenant.resolvers';
import { BoundedContextListComponent } from './bounded-context/bounded-context-list.component';
import { BoundedContextDetailComponent } from './bounded-context/bounded-context-detail.component';
import { boundedContextEditResolver, boundedContextNewResolver, boundedContextPaginationResolver } from './bounded-context/bounded-context.resolvers';
import { RoleListComponent } from './role/role-list.component';
import { RoleDetailComponent } from './role/role-detail.component';
import { roleEditResolver, roleNewResolver, rolePaginationResolver } from './role/role.resolvers';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { accountEditResolver, accountNewResolver, accountPaginationResolver } from './account/account.resolvers';
import { PermissionListComponent } from './permission/permission-list.component';
import { PermissionDetailComponent } from './permission/permission-detail.component';
import { permissionEditResolver, permissionNewResolver, permissionPaginationResolver } from './permission/permission.resolvers';

export default [
    {
        path     : '',
        component: IamComponent,
        children : [
            { path: 'tenant', component: TenantListComponent, resolve: { data: tenantPaginationResolver }, data: { permission: 'iam.tenant.get' }},
            { path: 'tenant/new', component: TenantDetailComponent, resolve: { data: tenantNewResolver }, data: { permission: 'iam.tenant.create' }},
            { path: 'tenant/edit/:id', component: TenantDetailComponent, resolve: { data: tenantEditResolver }, data: { permission: 'iam.tenant.get' }},
            { path: 'bounded-context', component: BoundedContextListComponent, resolve: { data: boundedContextPaginationResolver }, data: { permission: 'iam.boundedContext.get' }},
            { path: 'bounded-context/new', component: BoundedContextDetailComponent, resolve: { data: boundedContextNewResolver }, data: { permission: 'iam.boundedContext.create' }},
            { path: 'bounded-context/edit/:id', component: BoundedContextDetailComponent, resolve: { data: boundedContextEditResolver }, data: { permission: 'iam.boundedContext.get' }},
            { path: 'role', component: RoleListComponent, resolve: { data: rolePaginationResolver }, data: { permission: 'iam.role.get' }},
            { path: 'role/new', component: RoleDetailComponent, resolve: { data: roleNewResolver }, data: { permission: 'iam.role.create' }},
            { path: 'role/edit/:id', component: RoleDetailComponent, resolve: { data: roleEditResolver }, data: { permission: 'iam.role.get' }},
            { path: 'account', component: AccountListComponent, resolve: { data: accountPaginationResolver }, data: { permission: 'iam.account.get' }},
            { path: 'account/new', component: AccountDetailComponent, resolve: { data: accountNewResolver }, data: { permission: 'iam.account.create' }},
            { path: 'account/edit/:id', component: AccountDetailComponent, resolve: { data: accountEditResolver }, data: { permission: 'iam.account.get' }},
            { path: 'permission', component: PermissionListComponent, resolve: { data: permissionPaginationResolver }, data: { permission: 'iam.permission.get' }},
            { path: 'permission/new', component: PermissionDetailComponent, resolve: { data: permissionNewResolver }, data: { permission: 'iam.permission.create' }},
            { path: 'permission/edit/:id', component: PermissionDetailComponent, resolve: { data: permissionEditResolver }, data: { permission: 'iam.permission.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'iam',
                multi   : true,
            },
        ],
    },
];
