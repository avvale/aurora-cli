/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    IamAccountId,
    IamAccountType,
    IamAccountCode,
    IamAccountEmail,
    IamAccountIsActive,
    IamAccountClientId,
    IamAccountScopes,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountTenantIds,
    IamAccountCreatedAt,
    IamAccountUpdatedAt,
    IamAccountDeletedAt,
} from './value-objects';
import { IamCreatedAccountEvent } from '../application/events/iam-created-account.event';
import { IamUpdatedAccountEvent } from '../application/events/iam-updated-account.event';
import { IamDeletedAccountEvent } from '../application/events/iam-deleted-account.event';
import { IamUser } from '@app/iam/user';
import { OAuthClient } from '@app/o-auth/client';
import { IamRole } from '@app/iam/role';
import { IamTenant } from '@app/iam/tenant';

export class IamAccount extends AggregateRoot
{
    id: IamAccountId;
    type: IamAccountType;
    code: IamAccountCode;
    email: IamAccountEmail;
    isActive: IamAccountIsActive;
    clientId: IamAccountClientId;
    scopes: IamAccountScopes;
    dApplicationCodes: IamAccountDApplicationCodes;
    dPermissions: IamAccountDPermissions;
    dTenants: IamAccountDTenants;
    meta: IamAccountMeta;
    roleIds: IamAccountRoleIds;
    tenantIds: IamAccountTenantIds;
    createdAt: IamAccountCreatedAt;
    updatedAt: IamAccountUpdatedAt;
    deletedAt: IamAccountDeletedAt;

    // eager relationship
    user: IamUser;
    client: OAuthClient;
    roles: IamRole[];
    tenants: IamTenant[];

    constructor(
        id: IamAccountId,
        type: IamAccountType,
        code: IamAccountCode,
        email: IamAccountEmail,
        isActive: IamAccountIsActive,
        clientId: IamAccountClientId,
        scopes: IamAccountScopes,
        dApplicationCodes: IamAccountDApplicationCodes,
        dPermissions: IamAccountDPermissions,
        dTenants: IamAccountDTenants,
        meta: IamAccountMeta,
        roleIds: IamAccountRoleIds,
        tenantIds: IamAccountTenantIds,
        createdAt: IamAccountCreatedAt,
        updatedAt: IamAccountUpdatedAt,
        deletedAt: IamAccountDeletedAt,

        user?: IamUser,
        client?: OAuthClient,
        roles?: IamRole[],
        tenants?: IamTenant[],
    )
    {
        super();
        this.id = id;
        this.type = type;
        this.code = code;
        this.email = email;
        this.isActive = isActive;
        this.clientId = clientId;
        this.scopes = scopes;
        this.dApplicationCodes = dApplicationCodes;
        this.dPermissions = dPermissions;
        this.dTenants = dTenants;
        this.meta = meta;
        this.roleIds = roleIds;
        this.tenantIds = tenantIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.user = user;
        this.client = client;
        this.roles = roles;
        this.tenants = tenants;
    }

    static register (
        id: IamAccountId,
        type: IamAccountType,
        code: IamAccountCode,
        email: IamAccountEmail,
        isActive: IamAccountIsActive,
        clientId: IamAccountClientId,
        scopes: IamAccountScopes,
        dApplicationCodes: IamAccountDApplicationCodes,
        dPermissions: IamAccountDPermissions,
        dTenants: IamAccountDTenants,
        meta: IamAccountMeta,
        roleIds: IamAccountRoleIds,
        tenantIds: IamAccountTenantIds,
        createdAt: IamAccountCreatedAt,
        updatedAt: IamAccountUpdatedAt,
        deletedAt: IamAccountDeletedAt,

        user?: IamUser,
        client?: OAuthClient,
        roles?: IamRole[],
        tenants?: IamTenant[],
    ): IamAccount
    {
        return new IamAccount(
            id,
            type,
            code,
            email,
            isActive,
            clientId,
            scopes,
            dApplicationCodes,
            dPermissions,
            dTenants,
            meta,
            roleIds,
            tenantIds,
            createdAt,
            updatedAt,
            deletedAt,

            user,
            client,
            roles,
            tenants,
        );
    }

    created(account: IamAccount): void
    {
        this.apply(
            new IamCreatedAccountEvent(
                account.id.value,
                account.type.value,
                account.code?.value,
                account.email.value,
                account.isActive.value,
                account.clientId.value,
                account.scopes?.value,
                account.dApplicationCodes.value,
                account.dPermissions.value,
                account.dTenants.value,
                account.meta?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            ),
        );
    }

    updated(account: IamAccount): void
    {
        this.apply(
            new IamUpdatedAccountEvent(
                account.id?.value,
                account.type?.value,
                account.code?.value,
                account.email?.value,
                account.isActive?.value,
                account.clientId?.value,
                account.scopes?.value,
                account.dApplicationCodes?.value,
                account.dPermissions?.value,
                account.dTenants?.value,
                account.meta?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            ),
        );
    }

    deleted(account: IamAccount): void
    {
        this.apply(
            new IamDeletedAccountEvent(
                account.id.value,
                account.type.value,
                account.code?.value,
                account.email.value,
                account.isActive.value,
                account.clientId.value,
                account.scopes?.value,
                account.dApplicationCodes.value,
                account.dPermissions.value,
                account.dTenants.value,
                account.meta?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            type: this.type.value,
            code: this.code?.value,
            email: this.email.value,
            isActive: this.isActive.value,
            clientId: this.clientId.value,
            scopes: this.scopes?.value,
            dApplicationCodes: this.dApplicationCodes.value,
            dPermissions: this.dPermissions.value,
            dTenants: this.dTenants.value,
            meta: this.meta?.value,
            roleIds: this.roleIds?.value,
            tenantIds: this.tenantIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            user: this.user?.toDTO(),
            client: this.client?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            type: this.type.value,
            code: this.code?.value,
            email: this.email.value,
            isActive: this.isActive.value,
            clientId: this.clientId.value,
            scopes: this.scopes?.value,
            dApplicationCodes: this.dApplicationCodes.value,
            dPermissions: this.dPermissions.value,
            dTenants: this.dTenants.value,
            meta: this.meta?.value,
            roleIds: this.roleIds?.value,
            tenantIds: this.tenantIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            user: this.user?.toDTO(),
            client: this.client?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
        };
    }
}
