import { QueueManagerJob } from '@api/graphql';
import { QueueManagerFindJobByIdHandler } from '@api/queue-manager/job';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

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