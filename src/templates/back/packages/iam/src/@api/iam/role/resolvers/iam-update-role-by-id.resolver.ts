import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamUpdateRoleByIdHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.update')
export class IamUpdateRoleByIdResolver {
  constructor(private readonly handler: IamUpdateRoleByIdHandler) {}

  @Mutation('iamUpdateRoleById')
  async main(
    @Args('payload') payload: IamUpdateRoleByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamRole> {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
