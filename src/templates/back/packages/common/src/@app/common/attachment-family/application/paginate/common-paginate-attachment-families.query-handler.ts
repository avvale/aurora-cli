import { CommonPaginateAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { CommonPaginateAttachmentFamiliesService } from '@app/common/attachment-family/application/paginate/common-paginate-attachment-families.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateAttachmentFamiliesQuery)
export class CommonPaginateAttachmentFamiliesQueryHandler
  implements IQueryHandler<CommonPaginateAttachmentFamiliesQuery>
{
  constructor(
    private readonly paginateAttachmentFamiliesService: CommonPaginateAttachmentFamiliesService,
  ) {}

  async execute(
    query: CommonPaginateAttachmentFamiliesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } =
      await this.paginateAttachmentFamiliesService.main(
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
