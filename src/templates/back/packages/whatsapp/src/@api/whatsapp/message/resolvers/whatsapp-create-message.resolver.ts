import { WhatsappCreateMessageInput, WhatsappMessage } from '@api/graphql';
import { WhatsappCreateMessageHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.create')
export class WhatsappCreateMessageResolver
{
    constructor(
        private readonly handler: WhatsappCreateMessageHandler,
    ) {}

    @Mutation('whatsappCreateMessage')
    async main(
        @Args('payload') payload: WhatsappCreateMessageInput,
        @Timezone() timezone?: string,
    ): Promise<WhatsappMessage>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
