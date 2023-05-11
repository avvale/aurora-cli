import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindQueueByIdHandler } from '../handlers/queue-manager-find-queue-by-id.handler';
import { QueueManagerQueue } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerFindQueueByIdResolver
{
    constructor(
        private readonly handler: QueueManagerFindQueueByIdHandler,
    ) {}

    @Query('queueManagerFindQueueById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}