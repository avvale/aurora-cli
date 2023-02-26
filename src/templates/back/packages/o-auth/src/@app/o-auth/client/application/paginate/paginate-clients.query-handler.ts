import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurora-ts/core';
import { PaginateClientsQuery } from './paginate-clients.query';
import { PaginateClientsService } from './paginate-clients.service';

@QueryHandler(PaginateClientsQuery)
export class PaginateClientsQueryHandler implements IQueryHandler<PaginateClientsQuery>
{
    constructor(
        private readonly paginateClientsService: PaginateClientsService,
    ) {}

    async execute(query: PaginateClientsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateClientsService.main(
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