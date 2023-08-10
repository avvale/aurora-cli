import { QueueManagerJobRegistry, QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import { QueueManagerUpsertJobRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.upsert')
export class QueueManagerUpsertJobRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerUpsertJobRegistryHandler,
    ) {}

    @Mutation('queueManagerUpsertJobRegistry')
    async main(
        @Args('payload') payload: QueueManagerUpdateJobRegistryByIdInput,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
