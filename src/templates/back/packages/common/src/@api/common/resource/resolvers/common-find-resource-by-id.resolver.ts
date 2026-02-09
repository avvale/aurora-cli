/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonFindResourceByIdHandler } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.get')
export class CommonFindResourceByIdResolver {
  constructor(private readonly handler: CommonFindResourceByIdHandler) {}

  @Query('commonFindResourceById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonResource> {
    return await this.handler.main(id, constraint, timezone);
  }
}
