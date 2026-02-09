/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonAdministrativeAreaLevel1Response,
  CommonFindAdministrativeAreaLevel1Query,
} from '@app/common/administrative-area-level-1';
import { CommonFindAdministrativeAreaLevel1Service } from '@app/common/administrative-area-level-1/application/find/common-find-administrative-area-level-1.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAdministrativeAreaLevel1Query)
export class CommonFindAdministrativeAreaLevel1QueryHandler
  implements IQueryHandler<CommonFindAdministrativeAreaLevel1Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel1Mapper =
    new CommonAdministrativeAreaLevel1Mapper();

  constructor(
    private readonly findAdministrativeAreaLevel1Service: CommonFindAdministrativeAreaLevel1Service,
  ) {}

  async execute(
    query: CommonFindAdministrativeAreaLevel1Query,
  ): Promise<CommonAdministrativeAreaLevel1Response> {
    const administrativeAreaLevel1 =
      await this.findAdministrativeAreaLevel1Service.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      );

    return this.mapper.mapAggregateToResponse(administrativeAreaLevel1);
  }
}
