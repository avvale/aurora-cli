import { IamPaginateTagsQuery } from '@app/iam/tag';
import { IamPaginateTagsService } from '@app/iam/tag/application/paginate/iam-paginate-tags.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateTagsQuery)
export class IamPaginateTagsQueryHandler
  implements IQueryHandler<IamPaginateTagsQuery>
{
  constructor(private readonly paginateTagsService: IamPaginateTagsService) {}

  async execute(query: IamPaginateTagsQuery): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateTagsService.main(
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
