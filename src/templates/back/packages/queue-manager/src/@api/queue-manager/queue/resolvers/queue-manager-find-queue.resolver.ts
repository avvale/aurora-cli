import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerFindQueueHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.get')
export class QueueManagerFindQueueResolver {
  constructor(private readonly handler: QueueManagerFindQueueHandler) {}

  @Query('queueManagerFindQueue')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerQueue> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
