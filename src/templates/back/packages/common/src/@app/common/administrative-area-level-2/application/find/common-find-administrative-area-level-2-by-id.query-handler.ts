/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2Mapper,
  CommonAdministrativeAreaLevel2Response,
  CommonFindAdministrativeAreaLevel2ByIdQuery,
} from '@app/common/administrative-area-level-2';
import { CommonFindAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2-by-id.service';
import { CommonAdministrativeAreaLevel2Id } from '@app/common/administrative-area-level-2/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAdministrativeAreaLevel2ByIdQuery)
export class CommonFindAdministrativeAreaLevel2ByIdQueryHandler
  implements IQueryHandler<CommonFindAdministrativeAreaLevel2ByIdQuery>
{
  private readonly mapper: CommonAdministrativeAreaLevel2Mapper =
    new CommonAdministrativeAreaLevel2Mapper();

  constructor(
    private readonly findAdministrativeAreaLevel2ByIdService: CommonFindAdministrativeAreaLevel2ByIdService,
  ) {}

  async execute(
    query: CommonFindAdministrativeAreaLevel2ByIdQuery,
  ): Promise<CommonAdministrativeAreaLevel2Response> {
    const administrativeAreaLevel2 =
      await this.findAdministrativeAreaLevel2ByIdService.main(
        new CommonAdministrativeAreaLevel2Id(query.id),
        query.constraint,
        query.cQMetadata,
      );

    return this.mapper.mapAggregateToResponse(administrativeAreaLevel2);
  }
}
