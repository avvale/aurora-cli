import { Pagination } from '@api/graphql';
import { IamPaginateRolesHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamPaginateRolesResolver {
  constructor(private readonly handler: IamPaginateRolesHandler) {}

  @Query('iamPaginateRoles')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
