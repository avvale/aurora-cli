import { WhatsappCreateMessageInput } from '@api/graphql';
import { WhatsappCreateMessagesHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.create')
export class WhatsappCreateMessagesResolver
{
    constructor(
        private readonly handler: WhatsappCreateMessagesHandler,
    ) {}

    @Mutation('whatsappCreateMessages')
    async main(
        @Args('payload') payload: WhatsappCreateMessageInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
