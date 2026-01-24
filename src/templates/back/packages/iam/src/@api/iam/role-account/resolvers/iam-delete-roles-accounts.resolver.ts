import { IamRoleAccount } from '@api/graphql';
import { IamDeleteRolesAccountsHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.delete')
export class IamDeleteRolesAccountsResolver {
  constructor(private readonly handler: IamDeleteRolesAccountsHandler) {}

  @Mutation('iamDeleteRolesAccounts')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamRoleAccount[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
