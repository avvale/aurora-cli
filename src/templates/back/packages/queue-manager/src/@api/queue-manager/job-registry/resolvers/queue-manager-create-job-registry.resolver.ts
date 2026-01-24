import {
  QueueManagerCreateJobRegistryInput,
  QueueManagerJobRegistry,
} from '@api/graphql';
import { QueueManagerCreateJobRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobRegistryResolver {
  constructor(private readonly handler: QueueManagerCreateJobRegistryHandler) {}

  @Mutation('queueManagerCreateJobRegistry')
  async main(
    @Args('payload') payload: QueueManagerCreateJobRegistryInput,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerJobRegistry> {
    return await this.handler.main(payload, timezone);
  }
}
