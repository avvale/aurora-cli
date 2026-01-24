import { IamRole, IamUpdateRolesInput } from '@api/graphql';
import { IamUpdateRolesHandler } from '@api/iam/role';
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
export class IamUpdateRolesResolver {
  constructor(private readonly handler: IamUpdateRolesHandler) {}

  @Mutation('iamUpdateRoles')
  async main(
    @Args('payload') payload: IamUpdateRolesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamRole> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
