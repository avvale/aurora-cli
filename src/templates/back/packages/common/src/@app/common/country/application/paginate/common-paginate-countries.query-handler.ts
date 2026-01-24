import { CommonPaginateCountriesQuery } from '@app/common/country';
import { CommonPaginateCountriesService } from '@app/common/country/application/paginate/common-paginate-countries.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateCountriesQuery)
export class CommonPaginateCountriesQueryHandler
  implements IQueryHandler<CommonPaginateCountriesQuery>
{
  constructor(
    private readonly paginateCountriesService: CommonPaginateCountriesService,
  ) {}

  async execute(
    query: CommonPaginateCountriesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateCountriesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return new PaginationResponse(
      total,
      count,
      rows.map((item) => item.toDTO()),
    );
  }
}
