import { QueueManagerSumJobRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerSumJobRegistryService } from '@app/queue-manager/job-registry/application/sum/queue-manager-sum-job-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerSumJobRegistryQuery)
export class QueueManagerSumJobRegistryQueryHandler implements IQueryHandler<QueueManagerSumJobRegistryQuery>
{
    constructor(
        private readonly sumJobRegistryService: QueueManagerSumJobRegistryService,
    ) {}

    async execute(query: QueueManagerSumJobRegistryQuery): Promise<number>
    {
        return await this.sumJobRegistryService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
