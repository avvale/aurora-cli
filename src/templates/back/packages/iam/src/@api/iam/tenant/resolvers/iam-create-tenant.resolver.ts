import { IamCreateTenantInput, IamTenant } from '@api/graphql';
import { IamCreateTenantHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.create')
export class IamCreateTenantResolver {
  constructor(private readonly handler: IamCreateTenantHandler) {}

  @Mutation('iamCreateTenant')
  async main(
    @Args('payload') payload: IamCreateTenantInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamTenant> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
