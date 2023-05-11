import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpsertQueueHandler } from '../handlers/queue-manager-upsert-queue.handler';
import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';

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