import { CommonPaginateAttachmentLibrariesQuery } from '@app/common/attachment-library';
import { CommonPaginateAttachmentLibrariesService } from '@app/common/attachment-library/application/paginate/common-paginate-attachment-libraries.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonPaginateAttachmentLibrariesQuery)
export class CommonPaginateAttachmentLibrariesQueryHandler
  implements IQueryHandler<CommonPaginateAttachmentLibrariesQuery>
{
  constructor(
    private readonly paginateAttachmentLibrariesService: CommonPaginateAttachmentLibrariesService,
  ) {}

  async execute(
    query: CommonPaginateAttachmentLibrariesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } =
      await this.paginateAttachmentLibrariesService.main(
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
