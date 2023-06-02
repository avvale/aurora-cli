import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateLangsQuery } from './paginate-langs.query';
import { PaginateLangsService } from './paginate-langs.service';

@QueryHandler(PaginateLangsQuery)
export class PaginateLangsQueryHandler implements IQueryHandler<PaginateLangsQuery>
{
    constructor(
        private readonly paginateLangsService: PaginateLangsService,
    ) {}

    async execute(query: PaginateLangsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateLangsService.main(
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