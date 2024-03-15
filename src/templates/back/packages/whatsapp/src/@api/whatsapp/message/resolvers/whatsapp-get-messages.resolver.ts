import { WhatsappMessage } from '@api/graphql';
import { WhatsappGetMessagesHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.get')
export class WhatsappGetMessagesResolver
{
    constructor(
        private readonly handler: WhatsappGetMessagesHandler,
    ) {}

    @Query('whatsappGetMessages')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappMessage[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
