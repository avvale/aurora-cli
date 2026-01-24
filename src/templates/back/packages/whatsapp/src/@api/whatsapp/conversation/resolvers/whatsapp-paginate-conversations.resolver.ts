import { Pagination } from '@api/graphql';
import { WhatsappPaginateConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.get')
export class WhatsappPaginateConversationsResolver {
  constructor(private readonly handler: WhatsappPaginateConversationsHandler) {}

  @Query('whatsappPaginateConversations')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
