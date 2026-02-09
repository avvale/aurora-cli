/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3,
  CommonAdministrativeAreaLevel3Mapper,
  CommonAdministrativeAreaLevel3Response,
  CommonGetAdministrativeAreasLevel3Query,
} from '@app/common/administrative-area-level-3';
import { CommonGetAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/get/common-get-administrative-areas-level-3.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetAdministrativeAreasLevel3Query)
export class CommonGetAdministrativeAreasLevel3QueryHandler
  implements IQueryHandler<CommonGetAdministrativeAreasLevel3Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel3Mapper =
    new CommonAdministrativeAreaLevel3Mapper();

  constructor(
    private readonly getAdministrativeAreasLevel3Service: CommonGetAdministrativeAreasLevel3Service,
  ) {}

  async execute(
    query: CommonGetAdministrativeAreasLevel3Query,
  ): Promise<CommonAdministrativeAreaLevel3Response[] | LiteralObject[]> {
    const models = await this.getAdministrativeAreasLevel3Service.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(
      models as CommonAdministrativeAreaLevel3[],
    );
  }
}
