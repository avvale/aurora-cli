import {
  CommonCountryMapper,
  CommonCountryResponse,
  CommonFindCountryByIdQuery,
} from '@app/common/country';
import { CommonFindCountryByIdService } from '@app/common/country/application/find/common-find-country-by-id.service';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindCountryByIdQuery)
export class CommonFindCountryByIdQueryHandler
  implements IQueryHandler<CommonFindCountryByIdQuery>
{
  private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

  constructor(
    private readonly findCountryByIdService: CommonFindCountryByIdService,
  ) {}

  async execute(
    query: CommonFindCountryByIdQuery,
  ): Promise<CommonCountryResponse> {
    const country = await this.findCountryByIdService.main(
      new CommonCountryId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(country);
  }
}
