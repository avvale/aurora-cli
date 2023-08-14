import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerJobRegistryResponse } from '../../domain/queue-manager-job-registry.response';
import { QueueManagerJobRegistryMapper } from '../../domain/queue-manager-job-registry.mapper';
import { QueueManagerFindJobRegistryQuery } from './queue-manager-find-job-registry.query';
import { QueueManagerFindJobRegistryService } from './queue-manager-find-job-registry.service';

@QueryHandler(QueueManagerFindJobRegistryQuery)
export class QueueManagerFindJobRegistryQueryHandler implements IQueryHandler<QueueManagerFindJobRegistryQuery>
{
    private readonly mapper: QueueManagerJobRegistryMapper = new QueueManagerJobRegistryMapper();

    constructor(
        private readonly findJobRegistryService: QueueManagerFindJobRegistryService,
    ) {}

    async execute(query: QueueManagerFindJobRegistryQuery): Promise<QueueManagerJobRegistryResponse>
    {
        const jobRegistry = await this.findJobRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(jobRegistry);
    }
}
