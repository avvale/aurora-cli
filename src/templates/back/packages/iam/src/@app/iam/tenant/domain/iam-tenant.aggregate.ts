/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    IamTenantId,
    IamTenantName,
    IamTenantCode,
    IamTenantLogo,
    IamTenantIsActive,
    IamTenantMeta,
    IamTenantAccountIds,
    IamTenantCreatedAt,
    IamTenantUpdatedAt,
    IamTenantDeletedAt,
} from './value-objects';
import { IamCreatedTenantEvent } from '../application/events/iam-created-tenant.event';
import { IamUpdatedTenantEvent } from '../application/events/iam-updated-tenant.event';
import { IamDeletedTenantEvent } from '../application/events/iam-deleted-tenant.event';
import { IamAccount } from '@app/iam/account';

export class IamTenant extends AggregateRoot
{
    id: IamTenantId;
    name: IamTenantName;
    code: IamTenantCode;
    logo: IamTenantLogo;
    isActive: IamTenantIsActive;
    meta: IamTenantMeta;
    accountIds: IamTenantAccountIds;
    createdAt: IamTenantCreatedAt;
    updatedAt: IamTenantUpdatedAt;
    deletedAt: IamTenantDeletedAt;

    // eager relationship
    accounts: IamAccount[];

    constructor(
        id: IamTenantId,
        name: IamTenantName,
        code: IamTenantCode,
        logo: IamTenantLogo,
        isActive: IamTenantIsActive,
        meta: IamTenantMeta,
        accountIds: IamTenantAccountIds,
        createdAt: IamTenantCreatedAt,
        updatedAt: IamTenantUpdatedAt,
        deletedAt: IamTenantDeletedAt,

        accounts?: IamAccount[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.isActive = isActive;
        this.meta = meta;
        this.accountIds = accountIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.accounts = accounts;
    }

    static register (
        id: IamTenantId,
        name: IamTenantName,
        code: IamTenantCode,
        logo: IamTenantLogo,
        isActive: IamTenantIsActive,
        meta: IamTenantMeta,
        accountIds: IamTenantAccountIds,
        createdAt: IamTenantCreatedAt,
        updatedAt: IamTenantUpdatedAt,
        deletedAt: IamTenantDeletedAt,

        accounts?: IamAccount[],
    ): IamTenant
    {
        return new IamTenant(
            id,
            name,
            code,
            logo,
            isActive,
            meta,
            accountIds,
            createdAt,
            updatedAt,
            deletedAt,

            accounts,
        );
    }

    created(tenant: IamTenant): void
    {
        this.apply(
            new IamCreatedTenantEvent(
                tenant.id.value,
                tenant.name.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive.value,
                tenant.meta?.value,
                tenant.accountIds?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
            ),
        );
    }

    updated(tenant: IamTenant): void
    {
        this.apply(
            new IamUpdatedTenantEvent(
                tenant.id?.value,
                tenant.name?.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive?.value,
                tenant.meta?.value,
                tenant.accountIds?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
            ),
        );
    }

    deleted(tenant: IamTenant): void
    {
        this.apply(
            new IamDeletedTenantEvent(
                tenant.id.value,
                tenant.name.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive.value,
                tenant.meta?.value,
                tenant.accountIds?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code?.value,
            logo: this.logo?.value,
            isActive: this.isActive.value,
            meta: this.meta?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accounts: this.accounts?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code?.value,
            logo: this.logo?.buffer,
            isActive: this.isActive.value,
            meta: this.meta?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accounts: this.accounts?.map(item => item.toDTO()),
        };
    }
}
