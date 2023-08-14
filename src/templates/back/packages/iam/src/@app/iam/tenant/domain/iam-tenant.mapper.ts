import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { IamTenant } from './iam-tenant.aggregate';
import { IamTenantResponse } from './iam-tenant.response';
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
import { IamAccountMapper } from '@app/iam/account';

export class IamTenantMapper implements IMapper
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

        return tenants.map(tenant => this.makeAggregate(tenant, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param tenant
     */
    mapAggregateToResponse(tenant: IamTenant): IamTenantResponse
    {
        return this.makeResponse(tenant);
    }

    /**
     * Map array of aggregates to array responses
     * @param tenants
     */
    mapAggregatesToResponses(tenants: IamTenant[]): IamTenantResponse[]
    {
        if (!Array.isArray(tenants)) return;

        return tenants.map(tenant => this.makeResponse(tenant));
    }

    private makeAggregate(tenant: LiteralObject, cQMetadata?: CQMetadata): IamTenant
    {
        return IamTenant.register(
            new IamTenantId(tenant.id, { undefinable: true }),
            new IamTenantName(tenant.name, { undefinable: true }),
            new IamTenantCode(tenant.code, { undefinable: true }),
            new IamTenantLogo(tenant.logo, { undefinable: true }),
            new IamTenantIsActive(tenant.isActive, { undefinable: true }),
            new IamTenantMeta(tenant.meta, { undefinable: true }),
            new IamTenantAccountIds(tenant.accountIds, { undefinable: true }),
            new IamTenantCreatedAt(tenant.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamTenantUpdatedAt(tenant.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamTenantDeletedAt(tenant.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new IamAccountMapper({ eagerLoading: true }).mapModelsToAggregates(tenant.accounts, cQMetadata) : undefined,
        );
    }

    private makeResponse(tenant: IamTenant): IamTenantResponse
    {
        if (!tenant) return;

        return new IamTenantResponse(
            tenant.id.value,
            tenant.name.value,
            tenant.code.value,
            tenant.logo.value,
            tenant.isActive.value,
            tenant.meta.value,
            tenant.accountIds.value,
            tenant.createdAt.value,
            tenant.updatedAt.value,
            tenant.deletedAt.value,
            this.options.eagerLoading ? new IamAccountMapper({ eagerLoading: true }).mapAggregatesToResponses(tenant.accounts) : undefined,
        );
    }
}
