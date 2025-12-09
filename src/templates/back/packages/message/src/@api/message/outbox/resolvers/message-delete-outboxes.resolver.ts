import { MessageOutbox } from '@api/graphql';
import { MessageDeleteOutboxesHandler } from '@api/message/outbox';
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
export class MessageDeleteOutboxesResolver {
    constructor(private readonly handler: MessageDeleteOutboxesHandler) {}

    @Mutation('messageDeleteOutboxes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageOutbox[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
