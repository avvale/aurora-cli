import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '@api/queue-manager/job-registry';
import { QueueManagerFindJobRegistryByIdQuery } from '@app/queue-manager/job-registry';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerFindJobRegistryByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto> {
    return await this.queryBus.ask(
      new QueueManagerFindJobRegistryByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
