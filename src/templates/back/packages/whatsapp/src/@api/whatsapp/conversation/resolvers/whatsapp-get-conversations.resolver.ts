import { WhatsappConversation } from '@api/graphql';
import { WhatsappGetConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.get')
export class WhatsappGetConversationsResolver {
  constructor(private readonly handler: WhatsappGetConversationsHandler) {}

  @Query('whatsappGetConversations')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappConversation[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
