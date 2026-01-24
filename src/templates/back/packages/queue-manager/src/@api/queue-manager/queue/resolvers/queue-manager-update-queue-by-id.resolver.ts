import {
  QueueManagerQueue,
  QueueManagerUpdateQueueByIdInput,
} from '@api/graphql';
import { QueueManagerUpdateQueueByIdHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.queue.update')
export class QueueManagerUpdateQueueByIdResolver {
  constructor(private readonly handler: QueueManagerUpdateQueueByIdHandler) {}

  @Mutation('queueManagerUpdateQueueById')
  async main(
    @Args('payload') payload: QueueManagerUpdateQueueByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerQueue> {
    return await this.handler.main(payload, constraint, timezone);
  }
}
