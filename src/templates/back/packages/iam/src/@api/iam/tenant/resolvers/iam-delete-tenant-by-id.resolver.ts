import { IamTenant } from '@api/graphql';
import { IamDeleteTenantByIdHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.delete')
export class IamDeleteTenantByIdResolver {
  constructor(private readonly handler: IamDeleteTenantByIdHandler) {}

  @Mutation('iamDeleteTenantById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamTenant> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
