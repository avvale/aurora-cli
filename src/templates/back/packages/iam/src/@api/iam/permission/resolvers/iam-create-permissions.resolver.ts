/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamCreatePermissionInput } from '@api/graphql';
import { IamCreatePermissionsHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permission.create')
export class IamCreatePermissionsResolver {
  constructor(private readonly handler: IamCreatePermissionsHandler) {}

  @Mutation('iamCreatePermissions')
  async main(
    @Args('payload') payload: IamCreatePermissionInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
