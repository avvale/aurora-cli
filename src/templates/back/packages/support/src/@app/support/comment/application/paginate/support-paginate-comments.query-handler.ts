import {
  SupportCommentMapper,
  SupportPaginateCommentsQuery,
} from '@app/support/comment';
import { SupportPaginateCommentsService } from '@app/support/comment/application/paginate/support-paginate-comments.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportPaginateCommentsQuery)
export class SupportPaginateCommentsQueryHandler
  implements IQueryHandler<SupportPaginateCommentsQuery>
{
  private readonly mapper: SupportCommentMapper = new SupportCommentMapper();

  constructor(
    private readonly paginateCommentsService: SupportPaginateCommentsService,
  ) {}

  async execute(
    query: SupportPaginateCommentsQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateCommentsService.main(
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
