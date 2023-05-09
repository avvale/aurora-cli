import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteQueueByIdHandler } from '../handlers/queue-manager-delete-queue-by-id.handler';
import { QueueManagerQueue } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueueByIdResolver
{
    constructor(
        private readonly handler: QueueManagerDeleteQueueByIdHandler,
    ) {}

    @Mutation('queueManagerDeleteQueueById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}