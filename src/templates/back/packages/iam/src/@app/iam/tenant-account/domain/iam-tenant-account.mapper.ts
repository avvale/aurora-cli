import { IamAccountMapper } from '@app/iam/account';
import { IamTenantMapper } from '@app/iam/tenant';
import {
    IamTenantAccount,
    IamTenantAccountResponse,
} from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class IamTenantAccountMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param tenantAccount
     */
    mapModelToAggregate(
        tenantAccount: LiteralObject,
        cQMetadata?: CQMetadata,
    ): IamTenantAccount {
        if (!tenantAccount) return;

        return this.makeAggregate(tenantAccount, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param tenantsAccounts
     */
    mapModelsToAggregates(
        tenantsAccounts: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): IamTenantAccount[] {
        if (!Array.isArray(tenantsAccounts)) return;

        return tenantsAccounts.map((tenantAccount) =>
            this.makeAggregate(tenantAccount, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param tenantAccount
     */
    mapAggregateToResponse(
        tenantAccount: IamTenantAccount,
    ): IamTenantAccountResponse {
        return this.makeResponse(tenantAccount);
    }

    /**
     * Map array of aggregates to array responses
     * @param tenantsAccounts
     */
    mapAggregatesToResponses(
        tenantsAccounts: IamTenantAccount[],
    ): IamTenantAccountResponse[] {
        if (!Array.isArray(tenantsAccounts)) return;

        return tenantsAccounts.map((tenantAccount) =>
            this.makeResponse(tenantAccount),
        );
    }

    private makeAggregate(
        tenantAccount: LiteralObject,
        cQMetadata?: CQMetadata,
    ): IamTenantAccount {
        return IamTenantAccount.register(
            new IamTenantAccountTenantId(tenantAccount.tenantId, {
                undefinable: true,
            }),
            new IamTenantAccountAccountId(tenantAccount.accountId, {
                undefinable: true,
            }),
            this.options.eagerLoading
                ? new IamTenantMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(tenantAccount.tenant, cQMetadata)
                : undefined,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(tenantAccount.account, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(
        tenantAccount: IamTenantAccount,
    ): IamTenantAccountResponse {
        if (!tenantAccount) return;

        return new IamTenantAccountResponse(
            tenantAccount.tenantId.value,
            tenantAccount.accountId.value,
            this.options.eagerLoading
                ? new IamTenantMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(tenantAccount.tenant)
                : undefined,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(tenantAccount.account)
                : undefined,
        );
    }
}
