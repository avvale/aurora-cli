import { IamAccountMapper } from '@app/iam/account';
import { IamRoleMapper } from '@app/iam/role';
import { IamRoleAccount, IamRoleAccountResponse } from '@app/iam/role-account';
import {
  IamRoleAccountAccountId,
  IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class IamRoleAccountMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param roleAccount
   */
  mapModelToAggregate(
    roleAccount: LiteralObject,
    cQMetadata?: CQMetadata,
  ): IamRoleAccount {
    if (!roleAccount) return;

    return this.makeAggregate(roleAccount, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param rolesAccounts
   */
  mapModelsToAggregates(
    rolesAccounts: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): IamRoleAccount[] {
    if (!Array.isArray(rolesAccounts)) return;

    return rolesAccounts.map((roleAccount) =>
      this.makeAggregate(roleAccount, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param roleAccount
   */
  mapAggregateToResponse(roleAccount: IamRoleAccount): IamRoleAccountResponse {
    return this.makeResponse(roleAccount);
  }

  /**
   * Map array of aggregates to array responses
   * @param rolesAccounts
   */
  mapAggregatesToResponses(
    rolesAccounts: IamRoleAccount[],
  ): IamRoleAccountResponse[] {
    if (!Array.isArray(rolesAccounts)) return;

    return rolesAccounts.map((roleAccount) => this.makeResponse(roleAccount));
  }

  private makeAggregate(
    roleAccount: LiteralObject,
    cQMetadata?: CQMetadata,
  ): IamRoleAccount {
    return IamRoleAccount.register(
      new IamRoleAccountRoleId(roleAccount.roleId, { undefinable: true }),
      new IamRoleAccountAccountId(roleAccount.accountId, {
        undefinable: true,
      }),
      this.options.eagerLoading
        ? new IamRoleMapper({ eagerLoading: true }).mapModelToAggregate(
            roleAccount.role,
            cQMetadata,
          )
        : undefined,
      this.options.eagerLoading
        ? new IamAccountMapper({
            eagerLoading: true,
          }).mapModelToAggregate(roleAccount.account, cQMetadata)
        : undefined,
    );
  }

  private makeResponse(roleAccount: IamRoleAccount): IamRoleAccountResponse {
    if (!roleAccount) return null;

    return new IamRoleAccountResponse(
      roleAccount.roleId.value,
      roleAccount.accountId.value,
      this.options.eagerLoading
        ? new IamRoleMapper({
            eagerLoading: true,
          }).mapAggregateToResponse(roleAccount.role)
        : undefined,
      this.options.eagerLoading
        ? new IamAccountMapper({
            eagerLoading: true,
          }).mapAggregateToResponse(roleAccount.account)
        : undefined,
    );
  }
}
