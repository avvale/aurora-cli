/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonAdministrativeAreaLevel2Mapper,
  CommonAdministrativeAreaLevel2Response,
  CommonGetAdministrativeAreasLevel2Query,
} from '@app/common/administrative-area-level-2';
import { CommonGetAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/get/common-get-administrative-areas-level-2.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetAdministrativeAreasLevel2Query)
export class CommonGetAdministrativeAreasLevel2QueryHandler
  implements IQueryHandler<CommonGetAdministrativeAreasLevel2Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel2Mapper =
    new CommonAdministrativeAreaLevel2Mapper();

  constructor(
    private readonly getAdministrativeAreasLevel2Service: CommonGetAdministrativeAreasLevel2Service,
  ) {}

  async execute(
    query: CommonGetAdministrativeAreasLevel2Query,
  ): Promise<CommonAdministrativeAreaLevel2Response[] | LiteralObject[]> {
    const models = await this.getAdministrativeAreasLevel2Service.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(
      models as CommonAdministrativeAreaLevel2[],
    );
  }
}
