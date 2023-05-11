import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateQueuesQuery } from './paginate-queues.query';
import { PaginateQueuesService } from './paginate-queues.service';

@QueryHandler(PaginateQueuesQuery)
export class PaginateQueuesQueryHandler implements IQueryHandler<PaginateQueuesQuery>
{
    constructor(
        private readonly paginateQueuesService: PaginateQueuesService,
    ) {}

    async execute(query: PaginateQueuesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateQueuesService.main(
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