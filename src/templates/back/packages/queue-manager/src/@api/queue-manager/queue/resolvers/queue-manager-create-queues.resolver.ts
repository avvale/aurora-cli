import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateQueuesHandler } from '../handlers/queue-manager-create-queues.handler';
import { QueueManagerCreateQueueInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.create')
export class QueueManagerCreateQueuesResolver
{
    constructor(
        private readonly handler: QueueManagerCreateQueuesHandler,
    ) {}

    @Mutation('queueManagerCreateQueues')
    async main(
        @Args('payload') payload: QueueManagerCreateQueueInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}