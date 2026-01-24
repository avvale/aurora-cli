import { WhatsappMessage } from '@api/graphql';
import { WhatsappDeleteMessagesHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.delete')
export class WhatsappDeleteMessagesResolver {
  constructor(private readonly handler: WhatsappDeleteMessagesHandler) {}

  @Mutation('whatsappDeleteMessages')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappMessage[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
