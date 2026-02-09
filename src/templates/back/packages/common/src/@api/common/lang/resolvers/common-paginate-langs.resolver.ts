/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonPaginateLangsHandler } from '@api/common/lang';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.lang.get')
export class CommonPaginateLangsResolver {
  constructor(private readonly handler: CommonPaginateLangsHandler) {}

  @Query('commonPaginateLangs')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
