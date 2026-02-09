/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountryMapper,
  CommonPaginateCountriesQuery,
} from '@app/common/country';
import { CommonPaginateCountriesService } from '@app/common/country/application/paginate/common-paginate-countries.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateCountriesQuery)
export class CommonPaginateCountriesQueryHandler
  implements IQueryHandler<CommonPaginateCountriesQuery>
{
  private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

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
      this.mapper.mapAggregatesToResponses(rows),
    );
  }
}
