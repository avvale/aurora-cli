import { MessageOutbox } from '@api/graphql';
import { MessageFindOutboxByIdHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.get')
export class MessageFindOutboxByIdResolver
{
    constructor(
        private readonly handler: MessageFindOutboxByIdHandler,
    ) {}

    @Query('messageFindOutboxById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<MessageOutbox>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
