import {
  QueueManagerFindQueueByIdQuery,
  QueueManagerQueueMapper,
  QueueManagerQueueResponse,
} from '@app/queue-manager/queue';
import { QueueManagerFindQueueByIdService } from '@app/queue-manager/queue/application/find/queue-manager-find-queue-by-id.service';
import { QueueManagerQueueId } from '@app/queue-manager/queue/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerFindQueueByIdQuery)
export class QueueManagerFindQueueByIdQueryHandler
  implements IQueryHandler<QueueManagerFindQueueByIdQuery>
{
  private readonly mapper: QueueManagerQueueMapper =
    new QueueManagerQueueMapper();

  constructor(
    private readonly findQueueByIdService: QueueManagerFindQueueByIdService,
  ) {}

  async execute(
    query: QueueManagerFindQueueByIdQuery,
  ): Promise<QueueManagerQueueResponse> {
    const queue = await this.findQueueByIdService.main(
      new QueueManagerQueueId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(queue);
  }
}
