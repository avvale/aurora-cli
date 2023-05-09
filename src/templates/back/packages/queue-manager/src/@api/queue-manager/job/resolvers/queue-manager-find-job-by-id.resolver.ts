import { Resolver, Args, Query } from '@nestjs/graphql';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindJobByIdHandler } from '../handlers/queue-manager-find-job-by-id.handler';
import { QueueManagerJob } from '@api/graphql';

@Resolver()
@Auth('queueManager.job.get')
export class QueueManagerFindJobByIdResolver
{
    constructor(
        private readonly handler: QueueManagerFindJobByIdHandler,
    ) {}

    @Query('queueManagerFindJobById')
    async main(
        @Args('id') id: string,
        @Args('name') name: string,
    ): Promise<QueueManagerJob>
    {
        return await this.handler.main(
            id,
            name,
        );
    }
}