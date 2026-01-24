import { IamInheritRoleInput } from '@api/graphql';
import { IamInheritPermissionsRoleRoleHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.update')
export class IamInheritPermissionsRoleRoleResolver {
  constructor(private readonly handler: IamInheritPermissionsRoleRoleHandler) {}

  @Mutation('iamInheritPermissionsRoleRole')
  async main(
    @Args('payload') payload: IamInheritRoleInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
