import { Pagination } from '@api/graphql';
import { MessagePaginateOutboxesHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.get')
export class MessagePaginateOutboxesResolver {
  constructor(private readonly handler: MessagePaginateOutboxesHandler) {}

  @Query('messagePaginateOutboxes')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
