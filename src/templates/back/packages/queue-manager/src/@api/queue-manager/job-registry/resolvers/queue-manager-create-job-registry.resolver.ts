import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateJobRegistryHandler } from '../handlers/queue-manager-create-job-registry.handler';
import { QueueManagerJobRegistry, QueueManagerCreateJobRegistryInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerCreateJobRegistryHandler,
    ) {}

    @Mutation('queueManagerCreateJobRegistry')
    async main(
        @Args('payload') payload: QueueManagerCreateJobRegistryInput,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}