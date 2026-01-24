import {
  CommonAttachmentLibraryMapper,
  CommonAttachmentLibraryResponse,
  CommonRawSQLAttachmentLibrariesQuery,
} from '@app/common/attachment-library';
import { CommonRawSQLAttachmentLibrariesService } from '@app/common/attachment-library/application/raw-sql/common-raw-sql-attachment-libraries.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonRawSQLAttachmentLibrariesQuery)
export class CommonRawSQLAttachmentLibrariesQueryHandler
  implements IQueryHandler<CommonRawSQLAttachmentLibrariesQuery>
{
  private readonly mapper: CommonAttachmentLibraryMapper =
    new CommonAttachmentLibraryMapper();

  constructor(
    private readonly rawSQLAttachmentLibrariesService: CommonRawSQLAttachmentLibrariesService,
  ) {}

  async execute(
    query: CommonRawSQLAttachmentLibrariesQuery,
  ): Promise<CommonAttachmentLibraryResponse[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.rawSQLAttachmentLibrariesService.main(
        query.rawSQL,
        query.cQMetadata,
      ),
    );
  }
}
