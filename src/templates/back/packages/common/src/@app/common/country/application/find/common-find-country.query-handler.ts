/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountryMapper,
  CommonCountryResponse,
  CommonFindCountryQuery,
} from '@app/common/country';
import { CommonFindCountryService } from '@app/common/country/application/find/common-find-country.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindCountryQuery)
export class CommonFindCountryQueryHandler
  implements IQueryHandler<CommonFindCountryQuery>
{
  private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

  constructor(private readonly findCountryService: CommonFindCountryService) {}

  async execute(query: CommonFindCountryQuery): Promise<CommonCountryResponse> {
    const country = await this.findCountryService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(country);
  }
}
