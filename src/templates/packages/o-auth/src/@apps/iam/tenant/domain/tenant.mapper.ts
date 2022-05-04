import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { IamTenant } from './tenant.aggregate';
import { TenantResponse } from './tenant.response';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from './value-objects';
import { AccountMapper } from '../../../../@apps/iam/account/domain/account.mapper';

export class TenantMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param tenant
     */
    mapModelToAggregate(tenant: LiteralObject, cQMetadata?: CQMetadata): IamTenant
    {
        if (!tenant) return;

        return this.makeAggregate(tenant, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param tenants
     */
    mapModelsToAggregates(tenants: LiteralObject[], cQMetadata?: CQMetadata): IamTenant[]
    {
        if (!Array.isArray(tenants)) return;

        return tenants.map(tenant  => this.makeAggregate(tenant, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param tenant
     */
    mapAggregateToResponse(tenant: IamTenant): TenantResponse
    {
        return this.makeResponse(tenant);
    }

    /**
     * Map array of aggregates to array responses
     * @param tenants
     */
    mapAggregatesToResponses(tenants: IamTenant[]): TenantResponse[]
    {
        if (!Array.isArray(tenants)) return;

        return tenants.map(tenant => this.makeResponse(tenant));
    }

    private makeAggregate(tenant: LiteralObject, cQMetadata?: CQMetadata): IamTenant
    {
        return IamTenant.register(
            new TenantId(tenant.id, { undefinable: true }),
            new TenantName(tenant.name, { undefinable: true }),
            new TenantCode(tenant.code, { undefinable: true }),
            new TenantLogo(tenant.logo, { undefinable: true }),
            new TenantIsActive(tenant.isActive, { undefinable: true }),
            new TenantData(tenant.data, { undefinable: true }),
            new TenantAccountIds(tenant.accountIds, { undefinable: true }),
            new TenantCreatedAt(tenant.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new TenantUpdatedAt(tenant.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new TenantDeletedAt(tenant.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: true }).mapModelsToAggregates(tenant.accounts) : undefined,
        );
    }

    private makeResponse(tenant: IamTenant): TenantResponse
    {
        if (!tenant) return;

        return new TenantResponse(
            tenant.id.value,
            tenant.name.value,
            tenant.code.value,
            tenant.logo.value,
            tenant.isActive.value,
            tenant.data.value,
            tenant.accountIds.value,
            tenant.createdAt.value,
            tenant.updatedAt.value,
            tenant.deletedAt.value,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: true }).mapAggregatesToResponses(tenant.accounts) : undefined,
        );
    }
}