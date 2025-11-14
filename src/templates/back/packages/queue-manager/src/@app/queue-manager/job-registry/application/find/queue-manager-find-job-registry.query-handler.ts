import {
    QueueManagerFindJobRegistryQuery,
    QueueManagerJobRegistryMapper,
    QueueManagerJobRegistryResponse,
} from '@app/queue-manager/job-registry';
import { QueueManagerFindJobRegistryService } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerFindJobRegistryQuery)
export class QueueManagerFindJobRegistryQueryHandler
    implements IQueryHandler<QueueManagerFindJobRegistryQuery>
{
    private readonly mapper: QueueManagerJobRegistryMapper =
        new QueueManagerJobRegistryMapper();

    constructor(
        private readonly findJobRegistryService: QueueManagerFindJobRegistryService,
    ) {}

    async execute(
        query: QueueManagerFindJobRegistryQuery,
    ): Promise<QueueManagerJobRegistryResponse> {
        const jobRegistry = await this.findJobRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(jobRegistry);
    }
}
