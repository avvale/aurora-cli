import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerGetJobsRegistryHandler } from '../handlers/queue-manager-get-jobs-registry.handler';
import { QueueManagerJobRegistry } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.get')
export class QueueManagerGetJobsRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerGetJobsRegistryHandler,
    ) {}

    @Query('queueManagerGetJobsRegistry')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}