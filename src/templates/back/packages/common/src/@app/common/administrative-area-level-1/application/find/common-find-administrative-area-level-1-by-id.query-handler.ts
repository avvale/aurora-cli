import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonAdministrativeAreaLevel1Response,
  CommonFindAdministrativeAreaLevel1ByIdQuery,
} from '@app/common/administrative-area-level-1';
import { CommonFindAdministrativeAreaLevel1ByIdService } from '@app/common/administrative-area-level-1/application/find/common-find-administrative-area-level-1-by-id.service';
import { CommonAdministrativeAreaLevel1Id } from '@app/common/administrative-area-level-1/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAdministrativeAreaLevel1ByIdQuery)
export class CommonFindAdministrativeAreaLevel1ByIdQueryHandler
  implements IQueryHandler<CommonFindAdministrativeAreaLevel1ByIdQuery>
{
  private readonly mapper: CommonAdministrativeAreaLevel1Mapper =
    new CommonAdministrativeAreaLevel1Mapper();

  constructor(
    private readonly findAdministrativeAreaLevel1ByIdService: CommonFindAdministrativeAreaLevel1ByIdService,
  ) {}

  async execute(
    query: CommonFindAdministrativeAreaLevel1ByIdQuery,
  ): Promise<CommonAdministrativeAreaLevel1Response> {
    const administrativeAreaLevel1 =
      await this.findAdministrativeAreaLevel1ByIdService.main(
        new CommonAdministrativeAreaLevel1Id(query.id),
        query.constraint,
        query.cQMetadata,
      );

    return this.mapper.mapAggregateToResponse(administrativeAreaLevel1);
  }
}
