import {
    QueueManagerJobRegistry,
    QueueManagerUpdateJobRegistryByIdInput,
} from '@api/graphql';
import { QueueManagerUpdateJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.update')
export class QueueManagerUpdateJobRegistryByIdResolver {
    constructor(
        private readonly handler: QueueManagerUpdateJobRegistryByIdHandler,
    ) {}

    @Mutation('queueManagerUpdateJobRegistryById')
    async main(
        @Args('payload') payload: QueueManagerUpdateJobRegistryByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<QueueManagerJobRegistry> {
        return await this.handler.main(payload, constraint, timezone);
    }
}
