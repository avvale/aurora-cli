/* eslint-disable key-spacing */
import { IamCreatedAccountEvent, IamDeletedAccountEvent, IamUpdatedAccountEvent } from '@app/iam/account';
import {
    IamAccountClientId,
    IamAccountCode,
    IamAccountCreatedAt,
    IamAccountDApplicationCodes,
    IamAccountDeletedAt,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountEmail,
    IamAccountId,
    IamAccountIsActive,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountScopes,
    IamAccountTags,
    IamAccountTenantIds,
    IamAccountType,
    IamAccountUpdatedAt,
} from '@app/iam/account/domain/value-objects';
import { IamRole } from '@app/iam/role';
import { IamTenant } from '@app/iam/tenant';
import { IamUser } from '@app/iam/user';
import { OAuthClient } from '@app/o-auth/client';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAccount extends AggregateRoot
{
    id: IamAccountId;
    type: IamAccountType;
    code: IamAccountCode;
    email: IamAccountEmail;
    isActive: IamAccountIsActive;
    clientId: IamAccountClientId;
    tags: IamAccountTags;
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
        tags: IamAccountTags,
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
        this.tags = tags;
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
        this.user = user;
        this.client = client;
        this.roles = roles;
        this.tenants = tenants;
    }

    static register(
        id: IamAccountId,
        type: IamAccountType,
        code: IamAccountCode,
        email: IamAccountEmail,
        isActive: IamAccountIsActive,
        clientId: IamAccountClientId,
        tags: IamAccountTags,
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
            tags,
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
                account.tags?.value,
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
                account.tags?.value,
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
                account.tags?.value,
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
            tags: this.tags?.value,
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
            tags: this.tags?.value,
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
            user: this.user?.toDTO(),
            client: this.client?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
        };
    }
}
