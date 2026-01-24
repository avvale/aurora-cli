import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerDeleteQueueByIdHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueueByIdResolver {
  constructor(private readonly handler: QueueManagerDeleteQueueByIdHandler) {}

  @Mutation('queueManagerDeleteQueueById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerQueue> {
    return await this.handler.main(id, constraint, timezone);
  }
}
