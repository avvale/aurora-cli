import {
  CommonAdministrativeAreaLevel2Mapper,
  CommonAdministrativeAreaLevel2Response,
  CommonRawSQLAdministrativeAreasLevel2Query,
} from '@app/common/administrative-area-level-2';
import { CommonRawSQLAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/raw-sql/common-raw-sql-administrative-areas-level-2.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonRawSQLAdministrativeAreasLevel2Query)
export class CommonRawSQLAdministrativeAreasLevel2QueryHandler
  implements IQueryHandler<CommonRawSQLAdministrativeAreasLevel2Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel2Mapper =
    new CommonAdministrativeAreaLevel2Mapper();

  constructor(
    private readonly rawSQLAdministrativeAreasLevel2Service: CommonRawSQLAdministrativeAreasLevel2Service,
  ) {}

  async execute(
    query: CommonRawSQLAdministrativeAreasLevel2Query,
  ): Promise<CommonAdministrativeAreaLevel2Response[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.rawSQLAdministrativeAreasLevel2Service.main(
        query.rawSQL,
        query.cQMetadata,
      ),
    );
  }
}
