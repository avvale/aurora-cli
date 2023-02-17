import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurora-ts/core';
import { PaginateHttpCommunicationsQuery } from './paginate-http-communications.query';
import { PaginateHttpCommunicationsService } from './paginate-http-communications.service';

@QueryHandler(PaginateHttpCommunicationsQuery)
export class PaginateHttpCommunicationsQueryHandler implements IQueryHandler<PaginateHttpCommunicationsQuery>
{
    constructor(
        private readonly paginateHttpCommunicationsService: PaginateHttpCommunicationsService,
    ) {}

    async execute(query: PaginateHttpCommunicationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateHttpCommunicationsService.main(
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