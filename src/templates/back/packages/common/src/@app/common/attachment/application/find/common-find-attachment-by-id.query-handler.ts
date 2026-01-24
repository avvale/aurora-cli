import {
  CommonAttachmentMapper,
  CommonAttachmentResponse,
  CommonFindAttachmentByIdQuery,
} from '@app/common/attachment';
import { CommonFindAttachmentByIdService } from '@app/common/attachment/application/find/common-find-attachment-by-id.service';
import { CommonAttachmentId } from '@app/common/attachment/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAttachmentByIdQuery)
export class CommonFindAttachmentByIdQueryHandler
  implements IQueryHandler<CommonFindAttachmentByIdQuery>
{
  private readonly mapper: CommonAttachmentMapper =
    new CommonAttachmentMapper();

  constructor(
    private readonly findAttachmentByIdService: CommonFindAttachmentByIdService,
  ) {}

  async execute(
    query: CommonFindAttachmentByIdQuery,
  ): Promise<CommonAttachmentResponse> {
    const attachment = await this.findAttachmentByIdService.main(
      new CommonAttachmentId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(attachment);
  }
}
