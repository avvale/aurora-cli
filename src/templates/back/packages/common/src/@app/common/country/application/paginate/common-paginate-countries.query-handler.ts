import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateCountriesQuery } from './common-paginate-countries.query';
import { CommonPaginateCountriesService } from './common-paginate-countries.service';

@QueryHandler(CommonPaginateCountriesQuery)
export class CommonPaginateCountriesQueryHandler implements IQueryHandler<CommonPaginateCountriesQuery>
{
    constructor(
        private readonly paginateCountriesService: CommonPaginateCountriesService,
    ) {}

    async execute(query: CommonPaginateCountriesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateCountriesService.main(
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