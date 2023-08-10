import { IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';
import { IamRoleAccount } from './iam-role-account.aggregate';
import {
    IamRoleRoleId,
    IamRoleAccountId,

} from './value-objects';

export class IamRoleAccountMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param roleAccount
     */
    mapModelToAggregate(roleAccount: LiteralObject): IamRoleAccount
    {
        if (!roleAccount) return;

        return this.makeAggregate(roleAccount);
    }

    /**
     * Map array of objects to array aggregates
     * @param rolesAccounts
     */
    mapModelsToAggregates(rolesAccounts: LiteralObject[]): IamRoleAccount[]
    {
        if (!Array.isArray(rolesAccounts)) return;

        return rolesAccounts.map(roleAccount  => this.makeAggregate(roleAccount));
    }

    mapAggregateToResponse(roleAccount: IamRoleAccount): LiteralObject
    {
        return null;
    }

    mapAggregatesToResponses(roleAccount: IamRoleAccount[]): LiteralObject[]
    {
        return null;
    }

    private makeAggregate(roleAccount: LiteralObject): IamRoleAccount
    {
        return IamRoleAccount.register(
            new IamRoleRoleId(roleAccount.roleId),
            new IamRoleAccountId(roleAccount.accountId),
        );
    }
}