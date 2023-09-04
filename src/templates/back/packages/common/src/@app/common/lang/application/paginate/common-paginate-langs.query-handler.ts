import { CommonPaginateLangsQuery } from '@app/common/lang';
import { CommonPaginateLangsService } from '@app/common/lang/application/paginate/common-paginate-langs.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
