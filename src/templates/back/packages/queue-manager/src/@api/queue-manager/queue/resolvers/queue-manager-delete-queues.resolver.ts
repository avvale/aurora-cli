import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerDeleteQueuesHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueuesResolver {
  constructor(private readonly handler: QueueManagerDeleteQueuesHandler) {}

  @Mutation('queueManagerDeleteQueues')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerQueue[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
