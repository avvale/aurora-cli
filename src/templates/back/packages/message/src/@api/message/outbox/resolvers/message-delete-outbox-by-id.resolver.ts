import { MessageOutbox } from '@api/graphql';
import { MessageDeleteOutboxByIdHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.delete')
export class MessageDeleteOutboxByIdResolver {
    constructor(private readonly handler: MessageDeleteOutboxByIdHandler) {}

    @Mutation('messageDeleteOutboxById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageOutbox> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
