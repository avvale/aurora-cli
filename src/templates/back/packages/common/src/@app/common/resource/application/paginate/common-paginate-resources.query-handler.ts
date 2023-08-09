import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateResourcesQuery } from './common-paginate-resources.query';
import { CommonPaginateResourcesService } from './common-paginate-resources.service';

@QueryHandler(CommonPaginateResourcesQuery)
export class CommonPaginateResourcesQueryHandler implements IQueryHandler<CommonPaginateResourcesQuery>
{
    constructor(
        private readonly paginateResourcesService: CommonPaginateResourcesService,
    ) {}

    async execute(query: CommonPaginateResourcesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateResourcesService.main(
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
