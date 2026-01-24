import { WhatsappMessage } from '@api/graphql';
import { WhatsappFindMessageByIdHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.get')
export class WhatsappFindMessageByIdResolver {
  constructor(private readonly handler: WhatsappFindMessageByIdHandler) {}

  @Query('whatsappFindMessageById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappMessage> {
    return await this.handler.main(id, constraint, timezone);
  }
}
