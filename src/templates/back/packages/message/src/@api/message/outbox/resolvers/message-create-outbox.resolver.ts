import { MessageCreateOutboxInput, MessageOutbox } from '@api/graphql';
import { MessageCreateOutboxHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.create')
export class MessageCreateOutboxResolver
{
    constructor(
        private readonly handler: MessageCreateOutboxHandler,
    ) {}

    @Mutation('messageCreateOutbox')
    async main(
        @Args('payload') payload: MessageCreateOutboxInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageOutbox>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
