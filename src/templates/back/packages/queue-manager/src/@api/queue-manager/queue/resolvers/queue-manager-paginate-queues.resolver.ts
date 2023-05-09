import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerPaginateQueuesHandler } from '../handlers/queue-manager-paginate-queues.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerPaginateQueuesResolver
{
    constructor(
        private readonly handler: QueueManagerPaginateQueuesHandler,
    ) {}

    @Query('queueManagerPaginateQueues')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}