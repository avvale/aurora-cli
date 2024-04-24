import { QueueManagerMinJobRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerMinJobRegistryService } from '@app/queue-manager/job-registry/application/min/queue-manager-min-job-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerMinJobRegistryQuery)
export class QueueManagerMinJobRegistryQueryHandler implements IQueryHandler<QueueManagerMinJobRegistryQuery>
{
    constructor(
        private readonly minJobRegistryService: QueueManagerMinJobRegistryService,
    ) {}

    async execute(query: QueueManagerMinJobRegistryQuery): Promise<number>
    {
        return await this.minJobRegistryService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
