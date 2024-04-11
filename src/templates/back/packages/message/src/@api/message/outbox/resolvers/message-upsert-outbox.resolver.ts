import { MessageOutbox, MessageUpdateOutboxByIdInput } from '@api/graphql';
import { MessageUpsertOutboxHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.upsert')
export class MessageUpsertOutboxResolver
{
    constructor(
        private readonly handler: MessageUpsertOutboxHandler,
    ) {}

    @Mutation('messageUpsertOutbox')
    async main(
        @Args('payload') payload: MessageUpdateOutboxByIdInput,
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
