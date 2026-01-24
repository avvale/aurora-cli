import {
  CommonAttachmentLibraryMapper,
  CommonAttachmentLibraryResponse,
  CommonFindAttachmentLibraryQuery,
} from '@app/common/attachment-library';
import { CommonFindAttachmentLibraryService } from '@app/common/attachment-library/application/find/common-find-attachment-library.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAttachmentLibraryQuery)
export class CommonFindAttachmentLibraryQueryHandler
  implements IQueryHandler<CommonFindAttachmentLibraryQuery>
{
  private readonly mapper: CommonAttachmentLibraryMapper =
    new CommonAttachmentLibraryMapper();

  constructor(
    private readonly findAttachmentLibraryService: CommonFindAttachmentLibraryService,
  ) {}

  async execute(
    query: CommonFindAttachmentLibraryQuery,
  ): Promise<CommonAttachmentLibraryResponse> {
    const attachmentLibrary = await this.findAttachmentLibraryService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(attachmentLibrary);
  }
}
