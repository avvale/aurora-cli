import { Pagination } from '@api/graphql';
import { QueueManagerPaginateJobsHandler } from '@api/queue-manager/job';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.job.get')
export class QueueManagerPaginateJobsResolver {
  constructor(private readonly handler: QueueManagerPaginateJobsHandler) {}

  @Query('queueManagerPaginateJobs')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
