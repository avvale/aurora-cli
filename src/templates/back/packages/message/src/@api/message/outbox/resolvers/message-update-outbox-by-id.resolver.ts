import { MessageOutbox, MessageUpdateOutboxByIdInput } from '@api/graphql';
import { MessageUpdateOutboxByIdHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.update')
export class MessageUpdateOutboxByIdResolver {
    constructor(private readonly handler: MessageUpdateOutboxByIdHandler) {}

    @Mutation('messageUpdateOutboxById')
    async main(
        @Args('payload') payload: MessageUpdateOutboxByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageOutbox> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
