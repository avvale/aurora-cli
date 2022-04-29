/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from './value-objects';
import { CreatedAccountEvent } from '../application/events/created-account.event';
import { UpdatedAccountEvent } from '../application/events/updated-account.event';
import { DeletedAccountEvent } from '../application/events/deleted-account.event';
import { IamUser } from '../../../../@apps/iam/user/domain/user.aggregate';
import { IamRole } from '../../../../@apps/iam/role/domain/role.aggregate';
import { IamTenant } from '../../../../@apps/iam/tenant/domain/tenant.aggregate';

export class IamAccount extends AggregateRoot
{
    id: AccountId;
    type: AccountType;
    email: AccountEmail;
    isActive: AccountIsActive;
    clientId: AccountClientId;
    dApplicationCodes: AccountDApplicationCodes;
    dPermissions: AccountDPermissions;
    dTenants: AccountDTenants;
    data: AccountData;
    roleIds: AccountRoleIds;
    tenantIds: AccountTenantIds;
    createdAt: AccountCreatedAt;
    updatedAt: AccountUpdatedAt;
    deletedAt: AccountDeletedAt;

    // eager relationship
    user: IamUser;
    roles: IamRole[];
    tenants: IamTenant[];

    constructor(
        id: AccountId,
        type: AccountType,
        email: AccountEmail,
        isActive: AccountIsActive,
        clientId: AccountClientId,
        dApplicationCodes: AccountDApplicationCodes,
        dPermissions: AccountDPermissions,
        dTenants: AccountDTenants,
        data: AccountData,
        roleIds: AccountRoleIds,
        tenantIds: AccountTenantIds,
        createdAt: AccountCreatedAt,
        updatedAt: AccountUpdatedAt,
        deletedAt: AccountDeletedAt,

        user?: IamUser,
        roles?: IamRole[],
        tenants?: IamTenant[],
    )
    {
        super();
        this.id = id;
        this.type = type;
        this.email = email;
        this.isActive = isActive;
        this.clientId = clientId;
        this.dApplicationCodes = dApplicationCodes;
        this.dPermissions = dPermissions;
        this.dTenants = dTenants;
        this.data = data;
        this.roleIds = roleIds;
        this.tenantIds = tenantIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.user = user;
        this.roles = roles;
        this.tenants = tenants;
    }

    static register (
        id: AccountId,
        type: AccountType,
        email: AccountEmail,
        isActive: AccountIsActive,
        clientId: AccountClientId,
        dApplicationCodes: AccountDApplicationCodes,
        dPermissions: AccountDPermissions,
        dTenants: AccountDTenants,
        data: AccountData,
        roleIds: AccountRoleIds,
        tenantIds: AccountTenantIds,
        createdAt: AccountCreatedAt,
        updatedAt: AccountUpdatedAt,
        deletedAt: AccountDeletedAt,

        user?: IamUser,
        roles?: IamRole[],
        tenants?: IamTenant[],
    ): IamAccount
    {
        return new IamAccount(
            id,
            type,
            email,
            isActive,
            clientId,
            dApplicationCodes,
            dPermissions,
            dTenants,
            data,
            roleIds,
            tenantIds,
            createdAt,
            updatedAt,
            deletedAt,

            user,
            roles,
            tenants,
        );
    }

    created(account: IamAccount): void
    {
        this.apply(
            new CreatedAccountEvent(
                account.id.value,
                account.type.value,
                account.email.value,
                account.isActive.value,
                account.clientId.value,
                account.dApplicationCodes.value,
                account.dPermissions.value,
                account.dTenants.value,
                account.data?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            )
        );
    }

    updated(account: IamAccount): void
    {
        this.apply(
            new UpdatedAccountEvent(
                account.id.value,
                account.type?.value,
                account.email?.value,
                account.isActive?.value,
                account.clientId?.value,
                account.dApplicationCodes?.value,
                account.dPermissions?.value,
                account.dTenants?.value,
                account.data?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            )
        );
    }

    deleted(account: IamAccount): void
    {
        this.apply(
            new DeletedAccountEvent(
                account.id.value,
                account.type.value,
                account.email.value,
                account.isActive.value,
                account.clientId.value,
                account.dApplicationCodes.value,
                account.dPermissions.value,
                account.dTenants.value,
                account.data?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            )
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            type: this.type.value,
            email: this.email.value,
            isActive: this.isActive.value,
            clientId: this.clientId.value,
            dApplicationCodes: this.dApplicationCodes.value,
            dPermissions: this.dPermissions.value,
            dTenants: this.dTenants.value,
            data: this.data?.value,
            roleIds: this.roleIds?.value,
            tenantIds: this.tenantIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            user: this.user?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
