import {
  CommonAttachmentMapper,
  CommonAttachmentResponse,
  CommonRawSQLAttachmentsQuery,
} from '@app/common/attachment';
import { CommonRawSQLAttachmentsService } from '@app/common/attachment/application/raw-sql/common-raw-sql-attachments.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonRawSQLAttachmentsQuery)
export class CommonRawSQLAttachmentsQueryHandler
  implements IQueryHandler<CommonRawSQLAttachmentsQuery>
{
  private readonly mapper: CommonAttachmentMapper =
    new CommonAttachmentMapper();

  constructor(
    private readonly rawSQLAttachmentsService: CommonRawSQLAttachmentsService,
  ) {}

  async execute(
    query: CommonRawSQLAttachmentsQuery,
  ): Promise<CommonAttachmentResponse[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.rawSQLAttachmentsService.main(query.rawSQL, query.cQMetadata),
    );
  }
}
