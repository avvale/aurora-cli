/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonPaginateAdministrativeAreasLevel1Query,
} from '@app/common/administrative-area-level-1';
import { CommonPaginateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/paginate/common-paginate-administrative-areas-level-1.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateAdministrativeAreasLevel1Query)
export class CommonPaginateAdministrativeAreasLevel1QueryHandler
  implements IQueryHandler<CommonPaginateAdministrativeAreasLevel1Query>
{
  private readonly mapper: CommonAdministrativeAreaLevel1Mapper =
    new CommonAdministrativeAreaLevel1Mapper();

  constructor(
    private readonly paginateAdministrativeAreasLevel1Service: CommonPaginateAdministrativeAreasLevel1Service,
  ) {}

  async execute(
    query: CommonPaginateAdministrativeAreasLevel1Query,
  ): Promise<PaginationResponse> {
    const { total, count, rows } =
      await this.paginateAdministrativeAreasLevel1Service.main(
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
