import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerPaginateJobsRegistryHandler } from '../handlers/queue-manager-paginate-jobs-registry.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.get')
export class QueueManagerPaginateJobsRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerPaginateJobsRegistryHandler,
    ) {}

    @Query('queueManagerPaginateJobsRegistry')
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