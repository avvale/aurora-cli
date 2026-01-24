import {
  CommonAdministrativeAreaLevel3Mapper,
  CommonAdministrativeAreaLevel3Response,
  CommonFindAdministrativeAreaLevel3Query,
} from '@app/common/administrative-area-level-3';
import { CommonFindAdministrativeAreaLevel3Service } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAdministrativeAreaLevel3Query)
export class CommonFindAdministrativeAreaLevel3QueryHandler
  implements IQueryHandler<CommonFindAdministrativeAreaLevel3Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel3Mapper =
    new CommonAdministrativeAreaLevel3Mapper();

  constructor(
    private readonly findAdministrativeAreaLevel3Service: CommonFindAdministrativeAreaLevel3Service,
  ) {}

  async execute(
    query: CommonFindAdministrativeAreaLevel3Query,
  ): Promise<CommonAdministrativeAreaLevel3Response> {
    const administrativeAreaLevel3 =
      await this.findAdministrativeAreaLevel3Service.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      );

    return this.mapper.mapAggregateToResponse(administrativeAreaLevel3);
  }
}
