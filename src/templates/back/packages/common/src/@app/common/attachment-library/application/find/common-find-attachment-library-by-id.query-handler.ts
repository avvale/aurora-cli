import {
  CommonAttachmentLibraryMapper,
  CommonAttachmentLibraryResponse,
  CommonFindAttachmentLibraryByIdQuery,
} from '@app/common/attachment-library';
import { CommonFindAttachmentLibraryByIdService } from '@app/common/attachment-library/application/find/common-find-attachment-library-by-id.service';
import { CommonAttachmentLibraryId } from '@app/common/attachment-library/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAttachmentLibraryByIdQuery)
export class CommonFindAttachmentLibraryByIdQueryHandler
  implements IQueryHandler<CommonFindAttachmentLibraryByIdQuery>
{
  private readonly mapper: CommonAttachmentLibraryMapper =
    new CommonAttachmentLibraryMapper();

  constructor(
    private readonly findAttachmentLibraryByIdService: CommonFindAttachmentLibraryByIdService,
  ) {}

  async execute(
    query: CommonFindAttachmentLibraryByIdQuery,
  ): Promise<CommonAttachmentLibraryResponse> {
    const attachmentLibrary = await this.findAttachmentLibraryByIdService.main(
      new CommonAttachmentLibraryId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(attachmentLibrary);
  }
}
