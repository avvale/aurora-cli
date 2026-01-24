import { IamRole } from '@api/graphql';
import { IamFindRoleHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamFindRoleResolver {
  constructor(private readonly handler: IamFindRoleHandler) {}

  @Query('iamFindRole')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<IamRole> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
