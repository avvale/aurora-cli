import {
  QueueManagerIJobRegistryRepository,
  QueueManagerJobRegistry,
} from '@app/queue-manager/job-registry';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerGetJobsRegistryService {
  constructor(
    private readonly repository: QueueManagerIJobRegistryRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<QueueManagerJobRegistry[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
