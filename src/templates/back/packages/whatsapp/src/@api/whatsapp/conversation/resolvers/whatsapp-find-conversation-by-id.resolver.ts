import { WhatsappConversation } from '@api/graphql';
import { WhatsappFindConversationByIdHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.get')
export class WhatsappFindConversationByIdResolver
{
    constructor(
        private readonly handler: WhatsappFindConversationByIdHandler,
    ) {}

    @Query('whatsappFindConversationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappConversation>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
