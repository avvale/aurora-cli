import { WhatsappConversation, WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappUpdateConversationByIdHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.update')
export class WhatsappUpdateConversationByIdResolver
{
    constructor(
        private readonly handler: WhatsappUpdateConversationByIdHandler,
    ) {}

    @Mutation('whatsappUpdateConversationById')
    async main(
        @Args('payload') payload: WhatsappUpdateConversationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappConversation>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
