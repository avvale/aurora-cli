import { QueueManagerJob } from '@api/graphql';
import { QueueManagerDeleteJobByIdHandler } from '@api/queue-manager/job';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.job.delete')
export class QueueManagerDeleteJobByIdResolver {
  constructor(private readonly handler: QueueManagerDeleteJobByIdHandler) {}

  @Mutation('queueManagerDeleteJobById')
  async main(
    @Args('id') id: string,
    @Args('name') name: string,
  ): Promise<QueueManagerJob> {
    return await this.handler.main(id, name);
  }
}
