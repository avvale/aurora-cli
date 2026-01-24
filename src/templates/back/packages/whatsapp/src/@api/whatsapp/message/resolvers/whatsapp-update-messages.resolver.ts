import { WhatsappMessage, WhatsappUpdateMessagesInput } from '@api/graphql';
import { WhatsappUpdateMessagesHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.update')
export class WhatsappUpdateMessagesResolver {
  constructor(private readonly handler: WhatsappUpdateMessagesHandler) {}

  @Mutation('whatsappUpdateMessages')
  async main(
    @Args('payload') payload: WhatsappUpdateMessagesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappMessage> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
