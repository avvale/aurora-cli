import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerJobRegistryResponse } from '../../domain/queue-manager-job-registry.response';
import { QueueManagerJobRegistryMapper } from '../../domain/queue-manager-job-registry.mapper';
import { QueueManagerJobRegistryId } from '../../domain/value-objects';
import { QueueManagerFindJobRegistryByIdQuery } from './queue-manager-find-job-registry-by-id.query';
import { QueueManagerFindJobRegistryByIdService } from './queue-manager-find-job-registry-by-id.service';

@QueryHandler(QueueManagerFindJobRegistryByIdQuery)
export class QueueManagerFindJobRegistryByIdQueryHandler implements IQueryHandler<QueueManagerFindJobRegistryByIdQuery>
{
    private readonly mapper: QueueManagerJobRegistryMapper = new QueueManagerJobRegistryMapper();

    constructor(
        private readonly findJobRegistryByIdService: QueueManagerFindJobRegistryByIdService,
    ) {}

    async execute(query: QueueManagerFindJobRegistryByIdQuery): Promise<QueueManagerJobRegistryResponse>
    {
        const jobRegistry = await this.findJobRegistryByIdService.main(
            new QueueManagerJobRegistryId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(jobRegistry);
    }
}
