import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindJobRegistryByIdHandler } from '../handlers/queue-manager-find-job-registry-by-id.handler';
import { QueueManagerJobRegistry } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.get')
export class QueueManagerFindJobRegistryByIdResolver
{
    constructor(
        private readonly handler: QueueManagerFindJobRegistryByIdHandler,
    ) {}

    @Query('queueManagerFindJobRegistryById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}