import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { IamAccount } from './account.aggregate';
import { AccountResponse } from './account.response';
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
import { UserMapper } from '../../../../@apps/iam/user/domain/user.mapper';
import { RoleMapper } from '../../../../@apps/iam/role/domain/role.mapper';
import { TenantMapper } from '../../../../@apps/iam/tenant/domain/tenant.mapper';

export class AccountMapper implements IMapper
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

        return accounts.map(account  => this.makeAggregate(account, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param account
     */
    mapAggregateToResponse(account: IamAccount): AccountResponse
    {
        return this.makeResponse(account);
    }

    /**
     * Map array of aggregates to array responses
     * @param accounts
     */
    mapAggregatesToResponses(accounts: IamAccount[]): AccountResponse[]
    {
        if (!Array.isArray(accounts)) return;

        return accounts.map(account => this.makeResponse(account));
    }

    private makeAggregate(account: LiteralObject, cQMetadata?: CQMetadata): IamAccount
    {
        return IamAccount.register(
            new AccountId(account.id, { undefinable: true }),
            new AccountType(account.type, { undefinable: true }),
            new AccountEmail(account.email, { undefinable: true }),
            new AccountIsActive(account.isActive, { undefinable: true }),
            new AccountClientId(account.clientId, { undefinable: true }),
            new AccountDApplicationCodes(account.dApplicationCodes, { undefinable: true }),
            new AccountDPermissions(account.dPermissions, { undefinable: true }),
            new AccountDTenants(account.dTenants, { undefinable: true }),
            new AccountData(account.data, { undefinable: true }),
            new AccountRoleIds(account.roleIds, { undefinable: true }),
            new AccountTenantIds(account.tenantIds, { undefinable: true }),
            new AccountCreatedAt(account.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AccountUpdatedAt(account.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AccountDeletedAt(account.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new UserMapper({ eagerLoading: true }).mapModelToAggregate(account.user) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: true }).mapModelsToAggregates(account.roles) : undefined,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: true }).mapModelsToAggregates(account.tenants) : undefined,
        );
    }

    private makeResponse(account: IamAccount): AccountResponse
    {
        if (!account) return;

        return new AccountResponse(
            account.id.value,
            account.type.value,
            account.email.value,
            account.isActive.value,
            account.clientId.value,
            account.dApplicationCodes.value,
            account.dPermissions.value,
            account.dTenants.value,
            account.data.value,
            account.roleIds.value,
            account.tenantIds.value,
            account.createdAt.value,
            account.updatedAt.value,
            account.deletedAt.value,
            this.options.eagerLoading ? new UserMapper({ eagerLoading: true }).mapAggregateToResponse(account.user) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: true }).mapAggregatesToResponses(account.roles) : undefined,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: true }).mapAggregatesToResponses(account.tenants) : undefined,
        );
    }
}