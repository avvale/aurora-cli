import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerGetQueuesHandler } from '../handlers/queue-manager-get-queues.handler';
import { QueueManagerQueue } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerGetQueuesResolver
{
    constructor(
        private readonly handler: QueueManagerGetQueuesHandler,
    ) {}

    @Query('queueManagerGetQueues')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}