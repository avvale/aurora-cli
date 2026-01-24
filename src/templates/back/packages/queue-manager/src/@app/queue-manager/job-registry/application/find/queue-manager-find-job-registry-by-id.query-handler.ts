import {
  QueueManagerFindJobRegistryByIdQuery,
  QueueManagerJobRegistryMapper,
  QueueManagerJobRegistryResponse,
} from '@app/queue-manager/job-registry';
import { QueueManagerFindJobRegistryByIdService } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry-by-id.service';
import { QueueManagerJobRegistryId } from '@app/queue-manager/job-registry/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerFindJobRegistryByIdQuery)
export class QueueManagerFindJobRegistryByIdQueryHandler
  implements IQueryHandler<QueueManagerFindJobRegistryByIdQuery>
{
  private readonly mapper: QueueManagerJobRegistryMapper =
    new QueueManagerJobRegistryMapper();

  constructor(
    private readonly findJobRegistryByIdService: QueueManagerFindJobRegistryByIdService,
  ) {}

  async execute(
    query: QueueManagerFindJobRegistryByIdQuery,
  ): Promise<QueueManagerJobRegistryResponse> {
    const jobRegistry = await this.findJobRegistryByIdService.main(
      new QueueManagerJobRegistryId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(jobRegistry);
  }
}
