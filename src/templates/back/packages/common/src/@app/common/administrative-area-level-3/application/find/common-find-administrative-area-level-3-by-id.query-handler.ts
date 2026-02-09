/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3Mapper,
  CommonAdministrativeAreaLevel3Response,
  CommonFindAdministrativeAreaLevel3ByIdQuery,
} from '@app/common/administrative-area-level-3';
import { CommonFindAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3-by-id.service';
import { CommonAdministrativeAreaLevel3Id } from '@app/common/administrative-area-level-3/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAdministrativeAreaLevel3ByIdQuery)
export class CommonFindAdministrativeAreaLevel3ByIdQueryHandler
  implements IQueryHandler<CommonFindAdministrativeAreaLevel3ByIdQuery>
{
  private readonly mapper: CommonAdministrativeAreaLevel3Mapper =
    new CommonAdministrativeAreaLevel3Mapper();

  constructor(
    private readonly findAdministrativeAreaLevel3ByIdService: CommonFindAdministrativeAreaLevel3ByIdService,
  ) {}

  async execute(
    query: CommonFindAdministrativeAreaLevel3ByIdQuery,
  ): Promise<CommonAdministrativeAreaLevel3Response> {
    const administrativeAreaLevel3 =
      await this.findAdministrativeAreaLevel3ByIdService.main(
        new CommonAdministrativeAreaLevel3Id(query.id),
        query.constraint,
        query.cQMetadata,
      );

    return this.mapper.mapAggregateToResponse(administrativeAreaLevel3);
  }
}
