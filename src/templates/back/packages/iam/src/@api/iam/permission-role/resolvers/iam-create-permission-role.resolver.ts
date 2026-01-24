/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatePermissionRoleInput, IamPermissionRole } from '@api/graphql';
import { IamCreatePermissionRoleHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.create')
export class IamCreatePermissionRoleResolver {
  constructor(private readonly handler: IamCreatePermissionRoleHandler) {}

  @Mutation('iamCreatePermissionRole')
  async main(
    @Args('payload') payload: IamCreatePermissionRoleInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamPermissionRole> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
