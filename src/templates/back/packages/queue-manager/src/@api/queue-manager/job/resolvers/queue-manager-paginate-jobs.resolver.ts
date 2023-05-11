import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerPaginateJobsHandler } from '../handlers/queue-manager-paginate-jobs.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('queueManager.job.get')
export class QueueManagerPaginateJobsResolver
{
    constructor(
        private readonly handler: QueueManagerPaginateJobsHandler,
    ) {}

    @Query('queueManagerPaginateJobs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}