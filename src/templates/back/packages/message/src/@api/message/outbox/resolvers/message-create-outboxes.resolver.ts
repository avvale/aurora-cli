import { MessageCreateOutboxInput } from '@api/graphql';
import { MessageCreateOutboxesHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.create')
export class MessageCreateOutboxesResolver {
    constructor(private readonly handler: MessageCreateOutboxesHandler) {}

    @Mutation('messageCreateOutboxes')
    async main(
        @Args('payload') payload: MessageCreateOutboxInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
