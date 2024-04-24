import { QueueManagerMaxJobRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerMaxJobRegistryService } from '@app/queue-manager/job-registry/application/max/queue-manager-max-job-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerMaxJobRegistryQuery)
export class QueueManagerMaxJobRegistryQueryHandler implements IQueryHandler<QueueManagerMaxJobRegistryQuery>
{
    constructor(
        private readonly maxJobRegistryService: QueueManagerMaxJobRegistryService,
    ) {}

    async execute(query: QueueManagerMaxJobRegistryQuery): Promise<number>
    {
        return await this.maxJobRegistryService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
