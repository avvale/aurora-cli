/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { Pagination } from '@api/graphql';
import { IamPaginatePermissionsRolesHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.get')
export class IamPaginatePermissionsRolesResolver {
  constructor(private readonly handler: IamPaginatePermissionsRolesHandler) {}

  @Query('iamPaginatePermissionsRoles')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
