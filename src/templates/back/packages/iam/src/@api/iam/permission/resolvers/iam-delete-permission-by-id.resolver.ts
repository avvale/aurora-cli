/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import { IamDeletePermissionByIdHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permission.delete')
export class IamDeletePermissionByIdResolver {
  constructor(private readonly handler: IamDeletePermissionByIdHandler) {}

  @Mutation('iamDeletePermissionById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamPermission> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
