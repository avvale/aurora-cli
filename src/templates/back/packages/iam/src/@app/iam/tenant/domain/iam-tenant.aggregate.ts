/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import {
    IamCreatedTenantEvent,
    IamDeletedTenantEvent,
    IamUpdatedTenantEvent,
} from '@app/iam/tenant';
import {
    IamTenantAccountIds,
    IamTenantCode,
    IamTenantCreatedAt,
    IamTenantDeletedAt,
    IamTenantId,
    IamTenantIsActive,
    IamTenantLogo,
    IamTenantMeta,
    IamTenantName,
    IamTenantParentId,
    IamTenantRowId,
    IamTenantUpdatedAt,
} from '@app/iam/tenant/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamTenant extends AggregateRoot {
    id: IamTenantId;
    rowId: IamTenantRowId;
    parentId: IamTenantParentId;
    name: IamTenantName;
    code: IamTenantCode;
    logo: IamTenantLogo;
    isActive: IamTenantIsActive;
    meta: IamTenantMeta;
    accountIds: IamTenantAccountIds;
    createdAt: IamTenantCreatedAt;
    updatedAt: IamTenantUpdatedAt;
    deletedAt: IamTenantDeletedAt;
    parent: IamTenant;
    accounts: IamAccount[];

    constructor(
        id: IamTenantId,
        rowId: IamTenantRowId,
        parentId: IamTenantParentId,
        name: IamTenantName,
        code: IamTenantCode,
        logo: IamTenantLogo,
        isActive: IamTenantIsActive,
        meta: IamTenantMeta,
        accountIds: IamTenantAccountIds,
        createdAt: IamTenantCreatedAt,
        updatedAt: IamTenantUpdatedAt,
        deletedAt: IamTenantDeletedAt,
        parent?: IamTenant,
        accounts?: IamAccount[],
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.parentId = parentId;
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.isActive = isActive;
        this.meta = meta;
        this.accountIds = accountIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.parent = parent;
        this.accounts = accounts;
    }

    static register(
        id: IamTenantId,
        rowId: IamTenantRowId,
        parentId: IamTenantParentId,
        name: IamTenantName,
        code: IamTenantCode,
        logo: IamTenantLogo,
        isActive: IamTenantIsActive,
        meta: IamTenantMeta,
        accountIds: IamTenantAccountIds,
        createdAt: IamTenantCreatedAt,
        updatedAt: IamTenantUpdatedAt,
        deletedAt: IamTenantDeletedAt,
        parent?: IamTenant,
        accounts?: IamAccount[],
    ): IamTenant {
        return new IamTenant(
            id,
            rowId,
            parentId,
            name,
            code,
            logo,
            isActive,
            meta,
            accountIds,
            createdAt,
            updatedAt,
            deletedAt,
            parent,
            accounts,
        );
    }

    created(event: { payload: IamTenant; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamCreatedTenantEvent({
                payload: {
                    id: event.payload.id.value,
                    parentId: event.payload.parentId?.value,
                    name: event.payload.name.value,
                    code: event.payload.code?.value,
                    logo: event.payload.logo?.value,
                    isActive: event.payload.isActive.value,
                    meta: event.payload.meta?.value,
                    accountIds: event.payload.accountIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: IamTenant; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamUpdatedTenantEvent({
                payload: {
                    id: event.payload.id?.value,
                    parentId: event.payload.parentId?.value,
                    name: event.payload.name?.value,
                    code: event.payload.code?.value,
                    logo: event.payload.logo?.value,
                    isActive: event.payload.isActive?.value,
                    meta: event.payload.meta?.value,
                    accountIds: event.payload.accountIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: IamTenant; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamDeletedTenantEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    parentId: event.payload.parentId?.value,
                    name: event.payload.name.value,
                    code: event.payload.code?.value,
                    logo: event.payload.logo?.value,
                    isActive: event.payload.isActive.value,
                    meta: event.payload.meta?.value,
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
            parentId: this.parentId?.value,
            name: this.name.value,
            code: this.code?.value,
            logo: this.logo?.value,
            isActive: this.isActive.value,
            meta: this.meta?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            parent: this.parent?.toDTO(),
            accounts: this.accounts?.map((item) => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            parentId: this.parentId?.value,
            name: this.name.value,
            code: this.code?.value,
            logo: this.logo?.value,
            isActive: this.isActive.value,
            meta: this.meta?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            parent: this.parent?.toDTO(),
            accounts: this.accounts?.map((item) => item.toDTO()),
        };
    }
}
