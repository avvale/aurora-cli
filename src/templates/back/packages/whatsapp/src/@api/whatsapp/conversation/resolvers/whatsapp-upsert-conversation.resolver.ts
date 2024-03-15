import { WhatsappConversation, WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappUpsertConversationHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.upsert')
export class WhatsappUpsertConversationResolver
{
    constructor(
        private readonly handler: WhatsappUpsertConversationHandler,
    ) {}

    @Mutation('whatsappUpsertConversation')
    async main(
        @Args('payload') payload: WhatsappUpdateConversationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<WhatsappConversation>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
