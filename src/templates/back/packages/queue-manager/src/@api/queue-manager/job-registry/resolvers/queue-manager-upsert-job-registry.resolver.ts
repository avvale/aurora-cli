import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpsertJobRegistryHandler } from '../handlers/queue-manager-upsert-job-registry.handler';
import { QueueManagerJobRegistry, QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';

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