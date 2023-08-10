import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerJobRegistryResponse } from '../../domain/queue-manager-job-registry.response';
import { QueueManagerJobRegistryMapper } from '../../domain/queue-manager-job-registry.mapper';
import { QueueManagerGetJobsRegistryQuery } from './queue-manager-get-jobs-registry.query';
import { QueueManagerGetJobsRegistryService } from './queue-manager-get-jobs-registry.service';

@QueryHandler(QueueManagerGetJobsRegistryQuery)
export class QueueManagerGetJobsRegistryQueryHandler implements IQueryHandler<QueueManagerGetJobsRegistryQuery>
{
    private readonly mapper: QueueManagerJobRegistryMapper = new QueueManagerJobRegistryMapper();

    constructor(
        private readonly getJobsRegistryService: QueueManagerGetJobsRegistryService,
    ) {}

    async execute(query: QueueManagerGetJobsRegistryQuery): Promise<QueueManagerJobRegistryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getJobsRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
