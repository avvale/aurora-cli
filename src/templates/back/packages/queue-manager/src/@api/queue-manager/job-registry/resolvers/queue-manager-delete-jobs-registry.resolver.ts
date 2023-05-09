import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteJobsRegistryHandler } from '../handlers/queue-manager-delete-jobs-registry.handler';
import { QueueManagerJobRegistry } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobsRegistryResolver
{
    constructor(
        private readonly handler: QueueManagerDeleteJobsRegistryHandler,
    ) {}

    @Mutation('queueManagerDeleteJobsRegistry')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}