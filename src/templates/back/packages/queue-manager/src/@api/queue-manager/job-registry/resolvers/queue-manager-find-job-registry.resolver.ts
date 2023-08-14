import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerFindJobRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
