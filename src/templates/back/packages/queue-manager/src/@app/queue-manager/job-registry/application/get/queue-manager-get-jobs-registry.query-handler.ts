import { QueueManagerGetJobsRegistryQuery, QueueManagerJobRegistryMapper, QueueManagerJobRegistryResponse } from '@app/queue-manager/job-registry';
import { QueueManagerGetJobsRegistryService } from '@app/queue-manager/job-registry/application/get/queue-manager-get-jobs-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerGetJobsRegistryQuery)
export class QueueManagerGetJobsRegistryQueryHandler implements IQueryHandler<QueueManagerGetJobsRegistryQuery>
{
    private readonly mapper: QueueManagerJobRegistryMapper = new QueueManagerJobRegistryMapper();

    constructor(
        private readonly getJobsRegistryService: QueueManagerGetJobsRegistryService,
    ) {}

    async execute(query: QueueManagerGetJobsRegistryQuery): Promise<QueueManagerJobRegistryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getJobsRegistryService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
