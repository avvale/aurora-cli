import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateQueuesHandler } from '../handlers/queue-manager-update-queues.handler';
import { QueueManagerQueue, QueueManagerUpdateQueuesInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.update')
export class QueueManagerUpdateQueuesResolver
{
    constructor(
        private readonly handler: QueueManagerUpdateQueuesHandler,
    ) {}

    @Mutation('queueManagerUpdateQueues')
    async main(
        @Args('payload') payload: QueueManagerUpdateQueuesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}