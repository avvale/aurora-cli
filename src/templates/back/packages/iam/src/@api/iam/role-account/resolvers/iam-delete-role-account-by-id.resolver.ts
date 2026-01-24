import { IamRoleAccount } from '@api/graphql';
import { IamDeleteRoleAccountByIdHandler } from '@api/iam/role-account';
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
export class IamDeleteRoleAccountByIdResolver {
  constructor(private readonly handler: IamDeleteRoleAccountByIdHandler) {}

  @Mutation('iamDeleteRoleAccountById')
  async main(
    @Args('roleId') roleId: string,
    @Args('accountId') accountId: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamRoleAccount> {
    return await this.handler.main(
      roleId,
      accountId,
      constraint,
      timezone,
      auditing,
    );
  }
}
