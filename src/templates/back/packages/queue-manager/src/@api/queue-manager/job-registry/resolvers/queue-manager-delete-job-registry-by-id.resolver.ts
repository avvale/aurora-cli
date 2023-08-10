import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerDeleteJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
