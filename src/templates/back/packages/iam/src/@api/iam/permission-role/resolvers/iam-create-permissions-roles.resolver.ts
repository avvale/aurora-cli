/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatePermissionRoleInput } from '@api/graphql';
import { IamCreatePermissionsRolesHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.create')
export class IamCreatePermissionsRolesResolver {
  constructor(private readonly handler: IamCreatePermissionsRolesHandler) {}

  @Mutation('iamCreatePermissionsRoles')
  async main(
    @Args('payload') payload: IamCreatePermissionRoleInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
