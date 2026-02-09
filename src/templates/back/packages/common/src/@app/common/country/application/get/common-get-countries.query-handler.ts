/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountry,
  CommonCountryMapper,
  CommonCountryResponse,
  CommonGetCountriesQuery,
} from '@app/common/country';
import { CommonGetCountriesService } from '@app/common/country/application/get/common-get-countries.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetCountriesQuery)
export class CommonGetCountriesQueryHandler
  implements IQueryHandler<CommonGetCountriesQuery>
{
  private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

  constructor(
    private readonly getCountriesService: CommonGetCountriesService,
  ) {}

  async execute(
    query: CommonGetCountriesQuery,
  ): Promise<CommonCountryResponse[] | LiteralObject[]> {
    const models = await this.getCountriesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as CommonCountry[]);
  }
}
