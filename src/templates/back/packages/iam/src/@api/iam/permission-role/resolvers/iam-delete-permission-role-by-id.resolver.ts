/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamPermissionRole } from '@api/graphql';
import { IamDeletePermissionRoleByIdHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.delete')
export class IamDeletePermissionRoleByIdResolver {
  constructor(private readonly handler: IamDeletePermissionRoleByIdHandler) {}

  @Mutation('iamDeletePermissionRoleById')
  async main(
    @Args('permissionId') permissionId: string,
    @Args('roleId') roleId: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamPermissionRole> {
    return await this.handler.main(
      permissionId,
      roleId,
      constraint,
      timezone,
      auditing,
    );
  }
}
