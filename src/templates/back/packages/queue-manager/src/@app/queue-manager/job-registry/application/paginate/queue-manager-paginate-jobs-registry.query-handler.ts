import { QueueManagerPaginateJobsRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerPaginateJobsRegistryService } from '@app/queue-manager/job-registry/application/paginate/queue-manager-paginate-jobs-registry.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerPaginateJobsRegistryQuery)
export class QueueManagerPaginateJobsRegistryQueryHandler implements IQueryHandler<QueueManagerPaginateJobsRegistryQuery>
{
    constructor(
        private readonly paginateJobsRegistryService: QueueManagerPaginateJobsRegistryService,
    ) {}

    async execute(query: QueueManagerPaginateJobsRegistryQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateJobsRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
