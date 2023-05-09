import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurora-ts/core';
import { PaginateJobsRegistryQuery } from './paginate-jobs-registry.query';
import { PaginateJobsRegistryService } from './paginate-jobs-registry.service';

@QueryHandler(PaginateJobsRegistryQuery)
export class PaginateJobsRegistryQueryHandler implements IQueryHandler<PaginateJobsRegistryQuery>
{
    constructor(
        private readonly paginateJobsRegistryService: PaginateJobsRegistryService,
    ) {}

    async execute(query: PaginateJobsRegistryQuery): Promise<PaginationResponse>
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