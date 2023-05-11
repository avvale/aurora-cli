import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateQueueByIdHandler } from '../handlers/queue-manager-update-queue-by-id.handler';
import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.update')
export class QueueManagerUpdateQueueByIdResolver
{
    constructor(
        private readonly handler: QueueManagerUpdateQueueByIdHandler,
    ) {}

    @Mutation('queueManagerUpdateQueueById')
    async main(
        @Args('payload') payload: QueueManagerUpdateQueueByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}