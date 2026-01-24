import { CommonPaginateAttachmentsQuery } from '@app/common/attachment';
import { CommonPaginateAttachmentsService } from '@app/common/attachment/application/paginate/common-paginate-attachments.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateAttachmentsQuery)
export class CommonPaginateAttachmentsQueryHandler
  implements IQueryHandler<CommonPaginateAttachmentsQuery>
{
  constructor(
    private readonly paginateAttachmentsService: CommonPaginateAttachmentsService,
  ) {}

  async execute(
    query: CommonPaginateAttachmentsQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateAttachmentsService.main(
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
