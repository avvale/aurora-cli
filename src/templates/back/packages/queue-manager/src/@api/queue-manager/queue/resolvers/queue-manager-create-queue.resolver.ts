import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateQueueHandler } from '../handlers/queue-manager-create-queue.handler';
import { QueueManagerQueue, QueueManagerCreateQueueInput } from '@api/graphql';

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