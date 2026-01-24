import { CommonPaginateResourcesQuery } from '@app/common/resource';
import { CommonPaginateResourcesService } from '@app/common/resource/application/paginate/common-paginate-resources.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateResourcesQuery)
export class CommonPaginateResourcesQueryHandler
  implements IQueryHandler<CommonPaginateResourcesQuery>
{
  constructor(
    private readonly paginateResourcesService: CommonPaginateResourcesService,
  ) {}

  async execute(
    query: CommonPaginateResourcesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateResourcesService.main(
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
