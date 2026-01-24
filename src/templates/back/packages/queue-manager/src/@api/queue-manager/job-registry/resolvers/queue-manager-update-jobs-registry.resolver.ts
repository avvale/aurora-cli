import {
  QueueManagerJobRegistry,
  QueueManagerUpdateJobsRegistryInput,
} from '@api/graphql';
import { QueueManagerUpdateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.update')
export class QueueManagerUpdateJobsRegistryResolver {
  constructor(
    private readonly handler: QueueManagerUpdateJobsRegistryHandler,
  ) {}

  @Mutation('queueManagerUpdateJobsRegistry')
  async main(
    @Args('payload') payload: QueueManagerUpdateJobsRegistryInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerJobRegistry> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
