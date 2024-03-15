import { WhatsappConversation } from '@api/graphql';
import { WhatsappDeleteConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.conversation.delete')
export class WhatsappDeleteConversationsResolver
{
    constructor(
        private readonly handler: WhatsappDeleteConversationsHandler,
    ) {}

    @Mutation('whatsappDeleteConversations')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappConversation[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
