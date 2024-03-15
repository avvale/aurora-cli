import { WhatsappConversation } from '@api/graphql';
import { WhatsappDeleteConversationByIdHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.delete')
export class WhatsappDeleteConversationByIdResolver
{
    constructor(
        private readonly handler: WhatsappDeleteConversationByIdHandler,
    ) {}

    @Mutation('whatsappDeleteConversationById')
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
