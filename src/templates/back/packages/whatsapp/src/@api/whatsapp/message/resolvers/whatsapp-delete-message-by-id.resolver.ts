import { WhatsappMessage } from '@api/graphql';
import { WhatsappDeleteMessageByIdHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.delete')
export class WhatsappDeleteMessageByIdResolver {
  constructor(private readonly handler: WhatsappDeleteMessageByIdHandler) {}

  @Mutation('whatsappDeleteMessageById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappMessage> {
    return await this.handler.main(id, constraint, timezone);
  }
}
