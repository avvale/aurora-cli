import {
  WhatsappConversation,
  WhatsappUpdateConversationsInput,
} from '@api/graphql';
import { WhatsappUpdateConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.update')
export class WhatsappUpdateConversationsResolver {
  constructor(private readonly handler: WhatsappUpdateConversationsHandler) {}

  @Mutation('whatsappUpdateConversations')
  async main(
    @Args('payload') payload: WhatsappUpdateConversationsInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappConversation> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
