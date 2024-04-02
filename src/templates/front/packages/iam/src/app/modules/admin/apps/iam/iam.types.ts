import { OAuthClient } from '../o-auth/o-auth.types';

/***********
 * account *
 ***********/
export interface IamAccount {
    id: string;
    type: IamAccountType;
    code?: string;
    email: string;
    isActive: boolean;
    clientId: string;
    client: OAuthClient;
    scopes?: any;
    dApplicationCodes: any;
    dPermissions: any;
    dTenants: any;
    meta?: any;
    roles: IamRole[];
    roleIds?: string[];
    tenants: IamTenant[];
    tenantIds?: string[];
    user?: IamUser;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreateAccount {
    id: string;
    type: string;
    code?: string;
    email: string;
    isActive: boolean;
    clientId: string;
    scopes?: any;
    dApplicationCodes: any;
    dPermissions: any;
    dTenants: any;
    meta?: any;
    roleIds?: string[];
    tenantIds?: string[];
    user?;
}

export interface IamUpdateAccountById {
    id: string;
    type?: string;
    code?: string;
    email?: string;
    isActive?: boolean;
    clientId?: string;
    scopes?: any;
    dApplicationCodes?: any;
    dPermissions?: any;
    dTenants?: any;
    meta?: any;
    roleIds?: string[];
    tenantIds?: string[];
    user?;
}

export interface IamUpdateAccounts {
    id?: string;
    type?: string;
    code?: string;
    email?: string;
    isActive?: boolean;
    clientId?: string;
    scopes?: any;
    dApplicationCodes?: any;
    dPermissions?: any;
    dTenants?: any;
    meta?: any;
    roleIds?: string[];
    tenantIds?: string[];
    user?;
}

export enum IamAccountType {
    USER = 'USER',
    SERVICE = 'SERVICE'
}

/******************
 * boundedContext *
 ******************/
export interface IamBoundedContext {
    id: string;
    name: string;
    root: string;
    sort?: number;
    isActive: boolean;
    permissions?;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreateBoundedContext {
    id: string;
    name: string;
    root: string;
    sort?: number;
    isActive: boolean;
    permissions?;
}

export interface IamUpdateBoundedContextById {
    id: string;
    name?: string;
    root?: string;
    sort?: number;
    isActive?: boolean;
    permissions?;
}

export interface IamUpdateBoundedContexts {
    id?: string;
    name?: string;
    root?: string;
    sort?: number;
    isActive?: boolean;
    permissions?;
}

/********
 * role *
 ********/
export interface IamRole {
    id: string;
    name: string;
    isMaster: boolean;
    permissions?: IamPermission[];
    accounts?: IamAccount[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreateRole {
    id: string;
    name: string;
    isMaster: boolean;
    permissionIds?: string[];
    accountIds?: string[];
}

export interface IamUpdateRoleById {
    id: string;
    name?: string;
    isMaster?: boolean;
    permissionIds?: string[];
    accountIds?: string[];
}

export interface IamUpdateRoles {
    id?: string;
    name?: string;
    isMaster?: boolean;
    permissionIds?: string[];
    accountIds?: string[];
}

/**************
 * permission *
 **************/
export interface IamPermission {
    id: string;
    name: string;
    boundedContextId: string;
    roleIds?: string[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreatePermission {
    id: string;
    name: string;
    boundedContextId: string;
    roleIds?: string[];
}

export interface IamUpdatePermissionById {
    id: string;
    name?: string;
    boundedContextId?: string;
    roleIds?: string[];
}

export interface IamUpdatePermissions {
    id?: string;
    name?: string;
    boundedContextId?: string;
    roleIds?: string[];
}

/******************
 * permissionRole *
 ******************/
export interface IamPermissionRole {
    permissionId: string;
    permission?: IamPermission;
    roleId: string;
    role?: IamRole;
}

export interface IamCreatePermissionRole {
    permissionId: string;
    roleId: string;
}

/*******
 * tag *
 *******/
export interface IamTag
{
    id: string;
    name: string;
}

/**************
 * tenant *
 **************/
export interface IamTenant {
    id: string;
    name: string;
    code?: string;
    logo?: string;
    isActive: boolean;
    meta?: any;
    accountIds?: string[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreateTenant {
    id: string;
    name: string;
    code?: string;
    logo?: string;
    isActive: boolean;
    meta?: any;
    accountIds?: string[];
}

export interface IamUpdateTenantById {
    id: string;
    name?: string;
    code?: string;
    logo?: string;
    isActive?: boolean;
    meta?: any;
    accountIds?: string[];
}

export interface IamUpdateTenants {
    id?: string;
    name?: string;
    code?: string;
    logo?: string;
    isActive?: boolean;
    meta?: any;
    accountIds?: string[];
}

/********
 * user *
 ********/
export interface IamUser {
    id: string;
    accountId: string;
    name: string;
    surname?: string;
    avatar?: string;
    mobile?: string;
    langId?: string;
    username: string;
    password: string;
    rememberToken?: string;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreateUser {
    id: string;
    accountId: string;
    name: string;
    surname?: string;
    avatar?: string;
    mobile?: string;
    langId?: string;
    username: string;
    password: string;
    rememberToken?: string;
    meta?: any;
}

export interface IamUpdateUserById {
    id: string;
    accountId?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    mobile?: string;
    langId?: string;
    username?: string;
    password?: string;
    rememberToken?: string;
    meta?: any;
}

export interface IamUpdateUsers {
    id?: string;
    accountId?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    mobile?: string;
    langId?: string;
    username?: string;
    password?: string;
    rememberToken?: string;
    meta?: any;
}

export interface IamTag {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IamCreateTag {
    id: string;
    name: string;
}

export interface IamUpdateTagById {
    id: string;
    name?: string;
}

export interface IamUpdateTags {
    id?: string;
    name?: string;
}
