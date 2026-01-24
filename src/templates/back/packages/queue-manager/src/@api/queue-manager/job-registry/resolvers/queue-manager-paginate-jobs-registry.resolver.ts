import { Pagination } from '@api/graphql';
import { QueueManagerPaginateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.get')
export class QueueManagerPaginateJobsRegistryResolver {
  constructor(
    private readonly handler: QueueManagerPaginateJobsRegistryHandler,
  ) {}

  @Query('queueManagerPaginateJobsRegistry')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
