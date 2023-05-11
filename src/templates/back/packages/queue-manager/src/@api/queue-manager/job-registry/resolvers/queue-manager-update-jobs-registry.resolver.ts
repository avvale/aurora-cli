import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateJobsRegistryHandler } from '../handlers/queue-manager-update-jobs-registry.handler';
import { QueueManagerJobRegistry, QueueManagerUpdateJobsRegistryInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.update')
export class QueueManagerUpdateJobsRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerUpdateJobsRegistryHandler,
    ) {}

    @Mutation('queueManagerUpdateJobsRegistry')
    async main(
        @Args('payload') payload: QueueManagerUpdateJobsRegistryInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}