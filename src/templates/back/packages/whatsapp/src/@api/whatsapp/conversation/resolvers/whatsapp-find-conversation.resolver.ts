import { WhatsappConversation } from '@api/graphql';
import { WhatsappFindConversationHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.get')
export class WhatsappFindConversationResolver {
  constructor(private readonly handler: WhatsappFindConversationHandler) {}

  @Query('whatsappFindConversation')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappConversation> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
