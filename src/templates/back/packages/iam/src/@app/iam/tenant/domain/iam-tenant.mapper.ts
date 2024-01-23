import { IamAccountMapper } from '@app/iam/account';
import { IamTenant, IamTenantResponse } from '@app/iam/tenant';
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
    IamTenantUpdatedAt,
} from '@app/iam/tenant/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

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
            new IamTenantParentId(tenant.parentId, { undefinable: true }),
            new IamTenantName(tenant.name, { undefinable: true }),
            new IamTenantCode(tenant.code, { undefinable: true }),
            new IamTenantLogo(tenant.logo, { undefinable: true }),
            new IamTenantIsActive(tenant.isActive, { undefinable: true }),
            new IamTenantMeta(tenant.meta, { undefinable: true }),
            new IamTenantAccountIds(tenant.accountIds, { undefinable: true }),
            new IamTenantCreatedAt(tenant.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamTenantUpdatedAt(tenant.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamTenantDeletedAt(tenant.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new IamTenantMapper({ eagerLoading: true }).mapModelToAggregate(tenant.parent, cQMetadata) : undefined,
            this.options.eagerLoading ? new IamAccountMapper({ eagerLoading: true }).mapModelsToAggregates(tenant.accounts, cQMetadata) : undefined,
        );
    }

    private makeResponse(tenant: IamTenant): IamTenantResponse
    {
        if (!tenant) return;

        return new IamTenantResponse(
            tenant.id.value,
            tenant.parentId.value,
            tenant.name.value,
            tenant.code.value,
            tenant.logo.value,
            tenant.isActive.value,
            tenant.meta.value,
            tenant.accountIds.value,
            tenant.createdAt.value,
            tenant.updatedAt.value,
            tenant.deletedAt.value,
            this.options.eagerLoading ? new IamTenantMapper({ eagerLoading: true }).mapAggregateToResponse(tenant.parent) : undefined,
            this.options.eagerLoading ? new IamAccountMapper({ eagerLoading: true }).mapAggregatesToResponses(tenant.accounts) : undefined,
        );
    }
}
