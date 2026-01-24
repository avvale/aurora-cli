import {
  CommonAdministrativeAreaLevel2Mapper,
  CommonAdministrativeAreaLevel2Response,
  CommonFindAdministrativeAreaLevel2Query,
} from '@app/common/administrative-area-level-2';
import { CommonFindAdministrativeAreaLevel2Service } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAdministrativeAreaLevel2Query)
export class CommonFindAdministrativeAreaLevel2QueryHandler
  implements IQueryHandler<CommonFindAdministrativeAreaLevel2Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel2Mapper =
    new CommonAdministrativeAreaLevel2Mapper();

  constructor(
    private readonly findAdministrativeAreaLevel2Service: CommonFindAdministrativeAreaLevel2Service,
  ) {}

  async execute(
    query: CommonFindAdministrativeAreaLevel2Query,
  ): Promise<CommonAdministrativeAreaLevel2Response> {
    const administrativeAreaLevel2 =
      await this.findAdministrativeAreaLevel2Service.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      );

    return this.mapper.mapAggregateToResponse(administrativeAreaLevel2);
  }
}
