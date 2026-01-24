import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonAdministrativeAreaLevel1Response,
  CommonGetAdministrativeAreasLevel1Query,
} from '@app/common/administrative-area-level-1';
import { CommonGetAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/get/common-get-administrative-areas-level-1.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetAdministrativeAreasLevel1Query)
export class CommonGetAdministrativeAreasLevel1QueryHandler
  implements IQueryHandler<CommonGetAdministrativeAreasLevel1Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel1Mapper =
    new CommonAdministrativeAreaLevel1Mapper();

  constructor(
    private readonly getAdministrativeAreasLevel1Service: CommonGetAdministrativeAreasLevel1Service,
  ) {}

  async execute(
    query: CommonGetAdministrativeAreasLevel1Query,
  ): Promise<CommonAdministrativeAreaLevel1Response[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.getAdministrativeAreasLevel1Service.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      ),
    );
  }
}
