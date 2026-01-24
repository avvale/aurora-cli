import { CommonPaginateAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2';
import { CommonPaginateAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/paginate/common-paginate-administrative-areas-level-2.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateAdministrativeAreasLevel2Query)
export class CommonPaginateAdministrativeAreasLevel2QueryHandler
  implements IQueryHandler<CommonPaginateAdministrativeAreasLevel2Query>
{
  constructor(
    private readonly paginateAdministrativeAreasLevel2Service: CommonPaginateAdministrativeAreasLevel2Service,
  ) {}

  async execute(
    query: CommonPaginateAdministrativeAreasLevel2Query,
  ): Promise<PaginationResponse> {
    const { total, count, rows } =
      await this.paginateAdministrativeAreasLevel2Service.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      );

    return new PaginationResponse(
      total,
      count,
      rows.map((item) => item.toDTO()),
    );
  }
}
