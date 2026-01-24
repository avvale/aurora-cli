import {
  QueueManagerIQueueRepository,
  QueueManagerQueue,
} from '@app/queue-manager/queue';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerPaginateQueuesService {
  constructor(private readonly repository: QueueManagerIQueueRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<QueueManagerQueue>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
