import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateJobsRegistryHandler } from '../handlers/queue-manager-create-jobs-registry.handler';
import { QueueManagerCreateJobRegistryInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobsRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerCreateJobsRegistryHandler,
    ) {}

    @Mutation('queueManagerCreateJobsRegistry')
    async main(
        @Args('payload') payload: QueueManagerCreateJobRegistryInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}