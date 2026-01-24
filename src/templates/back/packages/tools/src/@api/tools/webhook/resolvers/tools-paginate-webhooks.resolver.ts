import { Pagination } from '@api/graphql';
import { ToolsPaginateWebhooksHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.get')
export class ToolsPaginateWebhooksResolver {
  constructor(private readonly handler: ToolsPaginateWebhooksHandler) {}

  @Query('toolsPaginateWebhooks')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
