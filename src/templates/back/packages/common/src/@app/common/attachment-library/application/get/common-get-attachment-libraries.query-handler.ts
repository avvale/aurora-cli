import {
  CommonAttachmentLibraryMapper,
  CommonAttachmentLibraryResponse,
  CommonGetAttachmentLibrariesQuery,
} from '@app/common/attachment-library';
import { CommonGetAttachmentLibrariesService } from '@app/common/attachment-library/application/get/common-get-attachment-libraries.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetAttachmentLibrariesQuery)
export class CommonGetAttachmentLibrariesQueryHandler
  implements IQueryHandler<CommonGetAttachmentLibrariesQuery>
{
  private readonly mapper: CommonAttachmentLibraryMapper =
    new CommonAttachmentLibraryMapper();

  constructor(
    private readonly getAttachmentLibrariesService: CommonGetAttachmentLibrariesService,
  ) {}

  async execute(
    query: CommonGetAttachmentLibrariesQuery,
  ): Promise<CommonAttachmentLibraryResponse[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.getAttachmentLibrariesService.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      ),
    );
  }
}
