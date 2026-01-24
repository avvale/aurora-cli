import { IamRole } from '@api/graphql';
import { IamFindRoleByIdHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamFindRoleByIdResolver {
  constructor(private readonly handler: IamFindRoleByIdHandler) {}

  @Query('iamFindRoleById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<IamRole> {
    return await this.handler.main(id, constraint, timezone);
  }
}
