import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindJobRegistryHandler } from '../handlers/queue-manager-find-job-registry.handler';
import { QueueManagerJobRegistry } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.get')
export class QueueManagerFindJobRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerFindJobRegistryHandler,
    ) {}

    @Query('queueManagerFindJobRegistry')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}