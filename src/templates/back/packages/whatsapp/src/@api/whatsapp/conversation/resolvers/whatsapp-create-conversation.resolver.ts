import { WhatsappConversation, WhatsappCreateConversationInput } from '@api/graphql';
import { WhatsappCreateConversationHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.create')
export class WhatsappCreateConversationResolver
{
    constructor(
        private readonly handler: WhatsappCreateConversationHandler,
    ) {}

    @Mutation('whatsappCreateConversation')
    async main(
        @Args('payload') payload: WhatsappCreateConversationInput,
        @Timezone() timezone?: string,
    ): Promise<WhatsappConversation>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
