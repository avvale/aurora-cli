import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateLangsQuery } from './common-paginate-langs.query';
import { CommonPaginateLangsService } from './common-paginate-langs.service';

@QueryHandler(CommonPaginateLangsQuery)
export class CommonPaginateLangsQueryHandler implements IQueryHandler<CommonPaginateLangsQuery>
{
    constructor(
        private readonly paginateLangsService: CommonPaginateLangsService,
    ) {}

    async execute(query: CommonPaginateLangsQuery): Promise<PaginationResponse>
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