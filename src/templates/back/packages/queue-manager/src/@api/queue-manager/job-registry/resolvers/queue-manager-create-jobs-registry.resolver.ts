import { QueueManagerCreateJobRegistryInput } from '@api/graphql';
import { QueueManagerCreateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobsRegistryResolver {
    constructor(
        private readonly handler: QueueManagerCreateJobsRegistryHandler,
    ) {}

    @Mutation('queueManagerCreateJobsRegistry')
    async main(
        @Args('payload') payload: QueueManagerCreateJobRegistryInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone);
    }
}
