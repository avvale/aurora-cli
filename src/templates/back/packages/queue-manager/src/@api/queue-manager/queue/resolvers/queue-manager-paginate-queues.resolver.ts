import { Pagination } from '@api/graphql';
import { QueueManagerPaginateQueuesHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerPaginateQueuesResolver {
  constructor(private readonly handler: QueueManagerPaginateQueuesHandler) {}

  @Query('queueManagerPaginateQueues')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
