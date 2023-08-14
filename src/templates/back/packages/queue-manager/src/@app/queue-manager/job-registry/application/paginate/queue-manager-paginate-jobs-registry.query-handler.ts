import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { QueueManagerPaginateJobsRegistryQuery } from './queue-manager-paginate-jobs-registry.query';
import { QueueManagerPaginateJobsRegistryService } from './queue-manager-paginate-jobs-registry.service';

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
