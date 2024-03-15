import { WhatsappMessage, WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappUpsertMessageHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.upsert')
export class WhatsappUpsertMessageResolver
{
    constructor(
        private readonly handler: WhatsappUpsertMessageHandler,
    ) {}

    @Mutation('whatsappUpsertMessage')
    async main(
        @Args('payload') payload: WhatsappUpdateMessageByIdInput,
        @Timezone() timezone?: string,
    ): Promise<WhatsappMessage>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
