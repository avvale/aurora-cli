import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindQueueHandler } from '../handlers/queue-manager-find-queue.handler';
import { QueueManagerQueue } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerFindQueueResolver
{
    constructor(
        private readonly handler: QueueManagerFindQueueHandler,
    ) {}

    @Query('queueManagerFindQueue')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}