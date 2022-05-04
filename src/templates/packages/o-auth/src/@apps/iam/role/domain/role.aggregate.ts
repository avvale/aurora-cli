/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './value-objects';
import { CreatedRoleEvent } from '../application/events/created-role.event';
import { UpdatedRoleEvent } from '../application/events/updated-role.event';
import { DeletedRoleEvent } from '../application/events/deleted-role.event';
import { IamPermission } from '../../../../@apps/iam/permission/domain/permission.aggregate';
import { IamAccount } from '../../../../@apps/iam/account/domain/account.aggregate';

export class IamRole extends AggregateRoot
{
    id: RoleId;
    name: RoleName;
    isMaster: RoleIsMaster;
    permissionIds: RolePermissionIds;
    accountIds: RoleAccountIds;
    createdAt: RoleCreatedAt;
    updatedAt: RoleUpdatedAt;
    deletedAt: RoleDeletedAt;

    // eager relationship
    permissions: IamPermission[];
    accounts: IamAccount[];

    constructor(
        id: RoleId,
        name: RoleName,
        isMaster: RoleIsMaster,
        permissionIds: RolePermissionIds,
        accountIds: RoleAccountIds,
        createdAt: RoleCreatedAt,
        updatedAt: RoleUpdatedAt,
        deletedAt: RoleDeletedAt,

        permissions?: IamPermission[],
        accounts?: IamAccount[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.isMaster = isMaster;
        this.permissionIds = permissionIds;
        this.accountIds = accountIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.permissions = permissions;
        this.accounts = accounts;
    }

    static register (
        id: RoleId,
        name: RoleName,
        isMaster: RoleIsMaster,
        permissionIds: RolePermissionIds,
        accountIds: RoleAccountIds,
        createdAt: RoleCreatedAt,
        updatedAt: RoleUpdatedAt,
        deletedAt: RoleDeletedAt,

        permissions?: IamPermission[],
        accounts?: IamAccount[],
    ): IamRole
    {
        return new IamRole(
            id,
            name,
            isMaster,
            permissionIds,
            accountIds,
            createdAt,
            updatedAt,
            deletedAt,

            permissions,
            accounts,
        );
    }

    created(role: IamRole): void
    {
        this.apply(
            new CreatedRoleEvent(
                role.id.value,
                role.name.value,
                role.isMaster.value,
                role.permissionIds?.value,
                role.accountIds?.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
            )
        );
    }

    updated(role: IamRole): void
    {
        this.apply(
            new UpdatedRoleEvent(
                role.id.value,
                role.name?.value,
                role.isMaster?.value,
                role.permissionIds?.value,
                role.accountIds?.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
            )
        );
    }

    deleted(role: IamRole): void
    {
        this.apply(
            new DeletedRoleEvent(
                role.id.value,
                role.name.value,
                role.isMaster.value,
                role.permissionIds?.value,
                role.accountIds?.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
            )
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            isMaster: this.isMaster.value,
            permissionIds: this.permissionIds?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            permissions: this.permissions?.map(item => item.toDTO()),
            accounts: this.accounts?.map(item => item.toDTO()),
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
