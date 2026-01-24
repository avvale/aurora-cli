import { WhatsappMessage, WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappUpdateMessageByIdHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.update')
export class WhatsappUpdateMessageByIdResolver {
  constructor(private readonly handler: WhatsappUpdateMessageByIdHandler) {}

  @Mutation('whatsappUpdateMessageById')
  async main(
    @Args('payload') payload: WhatsappUpdateMessageByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappMessage> {
    return await this.handler.main(payload, constraint, timezone);
  }
}
