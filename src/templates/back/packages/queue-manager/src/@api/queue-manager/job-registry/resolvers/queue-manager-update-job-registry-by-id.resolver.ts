import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateJobRegistryByIdHandler } from '../handlers/queue-manager-update-job-registry-by-id.handler';
import { QueueManagerJobRegistry, QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.update')
export class QueueManagerUpdateJobRegistryByIdResolver
{
    constructor(
        private readonly handler: QueueManagerUpdateJobRegistryByIdHandler,
    ) {}

    @Mutation('queueManagerUpdateJobRegistryById')
    async main(
        @Args('payload') payload: QueueManagerUpdateJobRegistryByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}