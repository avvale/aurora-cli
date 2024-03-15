import { WhatsappCreateConversationInput } from '@api/graphql';
import { WhatsappCreateConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.create')
export class WhatsappCreateConversationsResolver
{
    constructor(
        private readonly handler: WhatsappCreateConversationsHandler,
    ) {}

    @Mutation('whatsappCreateConversations')
    async main(
        @Args('payload') payload: WhatsappCreateConversationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
