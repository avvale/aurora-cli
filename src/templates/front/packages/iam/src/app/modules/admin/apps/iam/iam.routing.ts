/* eslint-disable max-len */
import { Route } from '@angular/router';
import { IamComponent } from './iam.component';
import { RoleListComponent } from './role/role-list.component';
import { RoleDetailComponent } from './role/role-detail.component';
import { RoleEditResolver, RoleNewResolver, RolePaginationResolver } from './role/role.resolvers';
import { BoundedContextListComponent } from './bounded-context/bounded-context-list.component';
import { BoundedContextDetailComponent } from './bounded-context/bounded-context-detail.component';
import { BoundedContextEditResolver, BoundedContextNewResolver, BoundedContextPaginationResolver } from './bounded-context/bounded-context.resolvers';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { AccountEditResolver, AccountNewResolver, AccountPaginationResolver } from './account/account.resolvers';
import { TenantListComponent } from './tenant/tenant-list.component';
import { TenantDetailComponent } from './tenant/tenant-detail.component';
import { TenantEditResolver, TenantNewResolver, TenantPaginationResolver } from './tenant/tenant.resolvers';

export const iamRoutes: Route[] = [
    {
        path     : '',
        component: IamComponent,
        children : [
            { path: 'role', component: RoleListComponent, resolve: { data: RolePaginationResolver }, data: { permission: 'iam.role.get' }},
            { path: 'role/new', component: RoleDetailComponent, resolve: { data: RoleNewResolver }, data: { permission: 'iam.role.create' }},
            { path: 'role/edit/:id', component: RoleDetailComponent, resolve: { data: RoleEditResolver }, data: { permission: 'iam.role.get' }},
            { path: 'bounded-context', component: BoundedContextListComponent, resolve: { data: BoundedContextPaginationResolver }, data: { permission: 'iam.boundedContext.get' }},
            { path: 'bounded-context/new', component: BoundedContextDetailComponent, resolve: { data: BoundedContextNewResolver }, data: { permission: 'iam.boundedContext.create' }},
            { path: 'bounded-context/edit/:id', component: BoundedContextDetailComponent, resolve: { data: BoundedContextEditResolver }, data: { permission: 'iam.boundedContext.get' }},
            { path: 'account', component: AccountListComponent, resolve: { data: AccountPaginationResolver }, data: { permission: 'iam.account.get' }},
            { path: 'account/new', component: AccountDetailComponent, resolve: { data: AccountNewResolver }, data: { permission: 'iam.account.create' }},
            { path: 'account/edit/:id', component: AccountDetailComponent, resolve: { data: AccountEditResolver }, data: { permission: 'iam.account.get' }},
            { path: 'tenant', component: TenantListComponent, resolve: { data: TenantPaginationResolver }, data: { permission: 'iam.tenant.get' }},
            { path: 'tenant/new', component: TenantDetailComponent, resolve: { data: TenantNewResolver }, data: { permission: 'iam.tenant.create' }},
            { path: 'tenant/edit/:id', component: TenantDetailComponent, resolve: { data: TenantEditResolver }, data: { permission: 'iam.tenant.get' }},
        ],
    },
];
