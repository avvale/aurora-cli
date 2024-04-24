import { QueueManagerCountJobRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerCountJobRegistryService } from '@app/queue-manager/job-registry/application/count/queue-manager-count-job-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerCountJobRegistryQuery)
export class QueueManagerCountJobRegistryQueryHandler implements IQueryHandler<QueueManagerCountJobRegistryQuery>
{
    constructor(
        private readonly countJobRegistryService: QueueManagerCountJobRegistryService,
    ) {}

    async execute(query: QueueManagerCountJobRegistryQuery): Promise<number>
    {
        return await this.countJobRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
