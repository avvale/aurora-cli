import { QueueManagerCreateQueueInput, QueueManagerQueue } from '@api/graphql';
import { QueueManagerCreateQueueHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.create')
export class QueueManagerCreateQueueResolver
{
    constructor(
        private readonly handler: QueueManagerCreateQueueHandler,
    ) {}

    @Mutation('queueManagerCreateQueue')
    async main(
        @Args('payload') payload: QueueManagerCreateQueueInput,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
