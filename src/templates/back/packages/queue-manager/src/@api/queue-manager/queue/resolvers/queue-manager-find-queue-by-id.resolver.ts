import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerFindQueueByIdHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerFindQueueByIdResolver {
    constructor(private readonly handler: QueueManagerFindQueueByIdHandler) {}

    @Query('queueManagerFindQueueById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerQueue> {
        return await this.handler.main(id, constraint, timezone);
    }
}
