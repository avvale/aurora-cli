import {
  CommonRawSQLResourcesQuery,
  CommonResourceMapper,
  CommonResourceResponse,
} from '@app/common/resource';
import { CommonRawSQLResourcesService } from '@app/common/resource/application/raw-sql/common-raw-sql-resources.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonRawSQLResourcesQuery)
export class CommonRawSQLResourcesQueryHandler
  implements IQueryHandler<CommonRawSQLResourcesQuery>
{
  private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

  constructor(
    private readonly rawSQLResourcesService: CommonRawSQLResourcesService,
  ) {}

  async execute(
    query: CommonRawSQLResourcesQuery,
  ): Promise<CommonResourceResponse[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.rawSQLResourcesService.main(query.rawSQL, query.cQMetadata),
    );
  }
}
