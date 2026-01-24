import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerFindJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('queueManager.jobRegistry.get')
export class QueueManagerFindJobRegistryByIdResolver {
  constructor(
    private readonly handler: QueueManagerFindJobRegistryByIdHandler,
  ) {}

  @Query('queueManagerFindJobRegistryById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<QueueManagerJobRegistry> {
    return await this.handler.main(id, constraint, timezone);
  }
}
