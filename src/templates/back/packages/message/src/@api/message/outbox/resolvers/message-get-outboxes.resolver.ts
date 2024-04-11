import { MessageOutbox } from '@api/graphql';
import { MessageGetOutboxesHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.get')
export class MessageGetOutboxesResolver
{
    constructor(
        private readonly handler: MessageGetOutboxesHandler,
    ) {}

    @Query('messageGetOutboxes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<MessageOutbox[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
