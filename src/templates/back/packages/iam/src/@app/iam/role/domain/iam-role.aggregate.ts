/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { IamPermission } from '@app/iam/permission';
import {
    IamCreatedRoleEvent,
    IamDeletedRoleEvent,
    IamUpdatedRoleEvent,
} from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDefaultRedirection,
    IamRoleDeletedAt,
    IamRoleHasHiddenVerticalNavigation,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleRowId,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamRole extends AggregateRoot {
    id: IamRoleId;
    rowId: IamRoleRowId;
    name: IamRoleName;
    defaultRedirection: IamRoleDefaultRedirection;
    hasHiddenVerticalNavigation: IamRoleHasHiddenVerticalNavigation;
    isMaster: IamRoleIsMaster;
    permissionIds: IamRolePermissionIds;
    accountIds: IamRoleAccountIds;
    createdAt: IamRoleCreatedAt;
    updatedAt: IamRoleUpdatedAt;
    deletedAt: IamRoleDeletedAt;
    permissions: IamPermission[];
    accounts: IamAccount[];

    constructor(
        id: IamRoleId,
        rowId: IamRoleRowId,
        name: IamRoleName,
        defaultRedirection: IamRoleDefaultRedirection,
        hasHiddenVerticalNavigation: IamRoleHasHiddenVerticalNavigation,
        isMaster: IamRoleIsMaster,
        permissionIds: IamRolePermissionIds,
        accountIds: IamRoleAccountIds,
        createdAt: IamRoleCreatedAt,
        updatedAt: IamRoleUpdatedAt,
        deletedAt: IamRoleDeletedAt,
        permissions?: IamPermission[],
        accounts?: IamAccount[],
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.name = name;
        this.defaultRedirection = defaultRedirection;
        this.hasHiddenVerticalNavigation = hasHiddenVerticalNavigation;
        this.isMaster = isMaster;
        this.permissionIds = permissionIds;
        this.accountIds = accountIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.permissions = permissions;
        this.accounts = accounts;
    }

    static register(
        id: IamRoleId,
        rowId: IamRoleRowId,
        name: IamRoleName,
        defaultRedirection: IamRoleDefaultRedirection,
        hasHiddenVerticalNavigation: IamRoleHasHiddenVerticalNavigation,
        isMaster: IamRoleIsMaster,
        permissionIds: IamRolePermissionIds,
        accountIds: IamRoleAccountIds,
        createdAt: IamRoleCreatedAt,
        updatedAt: IamRoleUpdatedAt,
        deletedAt: IamRoleDeletedAt,
        permissions?: IamPermission[],
        accounts?: IamAccount[],
    ): IamRole {
        return new IamRole(
            id,
            rowId,
            name,
            defaultRedirection,
            hasHiddenVerticalNavigation,
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

    created(event: { payload: IamRole; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamCreatedRoleEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    defaultRedirection: event.payload.defaultRedirection?.value,
                    hasHiddenVerticalNavigation:
                        event.payload.hasHiddenVerticalNavigation?.value,
                    isMaster: event.payload.isMaster.value,
                    permissionIds: event.payload.permissionIds?.value,
                    accountIds: event.payload.accountIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: IamRole; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamUpdatedRoleEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    defaultRedirection: event.payload.defaultRedirection?.value,
                    hasHiddenVerticalNavigation:
                        event.payload.hasHiddenVerticalNavigation?.value,
                    isMaster: event.payload.isMaster?.value,
                    permissionIds: event.payload.permissionIds?.value,
                    accountIds: event.payload.accountIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: IamRole; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamDeletedRoleEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    name: event.payload.name.value,
                    defaultRedirection: event.payload.defaultRedirection?.value,
                    hasHiddenVerticalNavigation:
                        event.payload.hasHiddenVerticalNavigation?.value,
                    isMaster: event.payload.isMaster.value,
                    permissionIds: event.payload.permissionIds?.value,
                    accountIds: event.payload.accountIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject {
        return {
            id: this.id.value,
            rowId: this.rowId.value,
            name: this.name.value,
            defaultRedirection: this.defaultRedirection?.value,
            hasHiddenVerticalNavigation:
                this.hasHiddenVerticalNavigation?.value,
            isMaster: this.isMaster.value,
            permissionIds: this.permissionIds?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            permissions: this.permissions?.map((item) => item.toDTO()),
            accounts: this.accounts?.map((item) => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            name: this.name.value,
            defaultRedirection: this.defaultRedirection?.value,
            hasHiddenVerticalNavigation:
                this.hasHiddenVerticalNavigation?.value,
            isMaster: this.isMaster.value,
            permissionIds: this.permissionIds?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            permissions: this.permissions?.map((item) => item.toDTO()),
            accounts: this.accounts?.map((item) => item.toDTO()),
        };
    }
}
