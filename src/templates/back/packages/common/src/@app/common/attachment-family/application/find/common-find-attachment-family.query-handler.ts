import {
  CommonAttachmentFamilyMapper,
  CommonAttachmentFamilyResponse,
  CommonFindAttachmentFamilyQuery,
} from '@app/common/attachment-family';
import { CommonFindAttachmentFamilyService } from '@app/common/attachment-family/application/find/common-find-attachment-family.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAttachmentFamilyQuery)
export class CommonFindAttachmentFamilyQueryHandler
  implements IQueryHandler<CommonFindAttachmentFamilyQuery>
{
  private readonly mapper: CommonAttachmentFamilyMapper =
    new CommonAttachmentFamilyMapper();

  constructor(
    private readonly findAttachmentFamilyService: CommonFindAttachmentFamilyService,
  ) {}

  async execute(
    query: CommonFindAttachmentFamilyQuery,
  ): Promise<CommonAttachmentFamilyResponse> {
    const attachmentFamily = await this.findAttachmentFamilyService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(attachmentFamily);
  }
}
