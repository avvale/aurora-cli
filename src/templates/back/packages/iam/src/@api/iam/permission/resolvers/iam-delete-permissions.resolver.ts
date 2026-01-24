/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import { IamDeletePermissionsHandler } from '@api/iam/permission';
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
export class IamDeletePermissionsResolver {
  constructor(private readonly handler: IamDeletePermissionsHandler) {}

  @Mutation('iamDeletePermissions')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamPermission[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
