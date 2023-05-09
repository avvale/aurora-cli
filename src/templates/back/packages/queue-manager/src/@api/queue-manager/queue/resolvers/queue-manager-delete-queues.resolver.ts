import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteQueuesHandler } from '../handlers/queue-manager-delete-queues.handler';
import { QueueManagerQueue } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueuesResolver
{
    constructor(
        private readonly handler: QueueManagerDeleteQueuesHandler,
    ) {}

    @Mutation('queueManagerDeleteQueues')
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