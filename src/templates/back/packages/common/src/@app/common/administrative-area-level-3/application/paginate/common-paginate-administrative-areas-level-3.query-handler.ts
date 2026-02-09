/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3Mapper,
  CommonPaginateAdministrativeAreasLevel3Query,
} from '@app/common/administrative-area-level-3';
import { CommonPaginateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/paginate/common-paginate-administrative-areas-level-3.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateAdministrativeAreasLevel3Query)
export class CommonPaginateAdministrativeAreasLevel3QueryHandler
  implements IQueryHandler<CommonPaginateAdministrativeAreasLevel3Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel3Mapper =
    new CommonAdministrativeAreaLevel3Mapper();

  constructor(
    private readonly paginateAdministrativeAreasLevel3Service: CommonPaginateAdministrativeAreasLevel3Service,
  ) {}

  async execute(
    query: CommonPaginateAdministrativeAreasLevel3Query,
  ): Promise<PaginationResponse> {
    const { total, count, rows } =
      await this.paginateAdministrativeAreasLevel3Service.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      );

    return new PaginationResponse(
      total,
      count,
      this.mapper.mapAggregatesToResponses(rows),
    );
  }
}
