import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerUpsertQueueHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.upsert')
export class QueueManagerUpsertQueueResolver
{
    constructor(
        private readonly handler: QueueManagerUpsertQueueHandler,
    ) {}

    @Mutation('queueManagerUpsertQueue')
    async main(
        @Args('payload') payload: QueueManagerUpdateQueueByIdInput,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
