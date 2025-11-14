import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerDeleteJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobsRegistryResolver {
    constructor(
        private readonly handler: QueueManagerDeleteJobsRegistryHandler,
    ) {}

    @Mutation('queueManagerDeleteJobsRegistry')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
