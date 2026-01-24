import { IamCreateTenantAccountInput } from '@api/graphql';
import { IamCreateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.create')
export class IamCreateTenantsAccountsResolver {
  constructor(private readonly handler: IamCreateTenantsAccountsHandler) {}

  @Mutation('iamCreateTenantsAccounts')
  async main(
    @Args('payload') payload: IamCreateTenantAccountInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
