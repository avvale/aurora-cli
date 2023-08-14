import { QueueManagerCreateQueueInput } from '@api/graphql';
import { QueueManagerCreateQueuesHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
