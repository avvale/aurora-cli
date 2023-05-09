import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteJobRegistryByIdHandler } from '../handlers/queue-manager-delete-job-registry-by-id.handler';
import { QueueManagerJobRegistry } from '@api/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobRegistryByIdResolver
{
    constructor(
        private readonly handler: QueueManagerDeleteJobRegistryByIdHandler,
    ) {}

    @Mutation('queueManagerDeleteJobRegistryById')
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