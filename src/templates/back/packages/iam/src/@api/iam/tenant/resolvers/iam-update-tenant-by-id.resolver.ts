import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';
import { IamUpdateTenantByIdHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.update')
export class IamUpdateTenantByIdResolver {
  constructor(private readonly handler: IamUpdateTenantByIdHandler) {}

  @Mutation('iamUpdateTenantById')
  async main(
    @Args('payload') payload: IamUpdateTenantByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamTenant> {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
