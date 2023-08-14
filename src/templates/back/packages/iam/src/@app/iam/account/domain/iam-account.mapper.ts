import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { IamAccount } from './iam-account.aggregate';
import { IamAccountResponse } from './iam-account.response';
import {
    IamAccountId,
    IamAccountType,
    IamAccountCode,
    IamAccountEmail,
    IamAccountIsActive,
    IamAccountClientId,
    IamAccountScopes,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountTenantIds,
    IamAccountCreatedAt,
    IamAccountUpdatedAt,
    IamAccountDeletedAt,
} from './value-objects';
import { IamUserMapper } from '@app/iam/user';
import { OAuthClientMapper } from '@app/o-auth/client';
import { IamRoleMapper } from '@app/iam/role';
import { IamTenantMapper } from '@app/iam/tenant';

export class IamAccountMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param account
     */
    mapModelToAggregate(account: LiteralObject, cQMetadata?: CQMetadata): IamAccount
    {
        if (!account) return;

        return this.makeAggregate(account, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param accounts
     */
    mapModelsToAggregates(accounts: LiteralObject[], cQMetadata?: CQMetadata): IamAccount[]
    {
        if (!Array.isArray(accounts)) return;

        return accounts.map(account => this.makeAggregate(account, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param account
     */
    mapAggregateToResponse(account: IamAccount): IamAccountResponse
    {
        return this.makeResponse(account);
    }

    /**
     * Map array of aggregates to array responses
     * @param accounts
     */
    mapAggregatesToResponses(accounts: IamAccount[]): IamAccountResponse[]
    {
        if (!Array.isArray(accounts)) return;

        return accounts.map(account => this.makeResponse(account));
    }

    private makeAggregate(account: LiteralObject, cQMetadata?: CQMetadata): IamAccount
    {
        return IamAccount.register(
            new IamAccountId(account.id, { undefinable: true }),
            new IamAccountType(account.type, { undefinable: true }),
            new IamAccountCode(account.code, { undefinable: true }),
            new IamAccountEmail(account.email, { undefinable: true }),
            new IamAccountIsActive(account.isActive, { undefinable: true }),
            new IamAccountClientId(account.clientId, { undefinable: true }),
            new IamAccountScopes(account.scopes, { undefinable: true }),
            new IamAccountDApplicationCodes(account.dApplicationCodes, { undefinable: true }),
            new IamAccountDPermissions(account.dPermissions, { undefinable: true }),
            new IamAccountDTenants(account.dTenants, { undefinable: true }),
            new IamAccountMeta(account.meta, { undefinable: true }),
            new IamAccountRoleIds(account.roleIds, { undefinable: true }),
            new IamAccountTenantIds(account.tenantIds, { undefinable: true }),
            new IamAccountCreatedAt(account.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamAccountUpdatedAt(account.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamAccountDeletedAt(account.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new IamUserMapper({ eagerLoading: true }).mapModelToAggregate(account.user, cQMetadata) : undefined,
            this.options.eagerLoading ? new OAuthClientMapper({ eagerLoading: true }).mapModelToAggregate(account.client, cQMetadata) : undefined,
            this.options.eagerLoading ? new IamRoleMapper({ eagerLoading: true }).mapModelsToAggregates(account.roles, cQMetadata) : undefined,
            this.options.eagerLoading ? new IamTenantMapper({ eagerLoading: true }).mapModelsToAggregates(account.tenants, cQMetadata) : undefined,
        );
    }

    private makeResponse(account: IamAccount): IamAccountResponse
    {
        if (!account) return;

        return new IamAccountResponse(
            account.id.value,
            account.type.value,
            account.code.value,
            account.email.value,
            account.isActive.value,
            account.clientId.value,
            account.scopes.value,
            account.dApplicationCodes.value,
            account.dPermissions.value,
            account.dTenants.value,
            account.meta.value,
            account.roleIds.value,
            account.tenantIds.value,
            account.createdAt.value,
            account.updatedAt.value,
            account.deletedAt.value,
            this.options.eagerLoading ? new IamUserMapper({ eagerLoading: true }).mapAggregateToResponse(account.user) : undefined,
            this.options.eagerLoading ? new OAuthClientMapper({ eagerLoading: true }).mapAggregateToResponse(account.client) : undefined,
            this.options.eagerLoading ? new IamRoleMapper({ eagerLoading: true }).mapAggregatesToResponses(account.roles) : undefined,
            this.options.eagerLoading ? new IamTenantMapper({ eagerLoading: true }).mapAggregatesToResponses(account.tenants) : undefined,
        );
    }
}
