import { CommonAttachmentFamilyMapper, CommonAttachmentFamilyResponse, CommonFindAttachmentFamilyByIdQuery } from '@app/common/attachment-family';
import { CommonFindAttachmentFamilyByIdService } from '@app/common/attachment-family/application/find/common-find-attachment-family-by-id.service';
import { CommonAttachmentFamilyId } from '@app/common/attachment-family/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAttachmentFamilyByIdQuery)
export class CommonFindAttachmentFamilyByIdQueryHandler implements IQueryHandler<CommonFindAttachmentFamilyByIdQuery>
{
    private readonly mapper: CommonAttachmentFamilyMapper = new CommonAttachmentFamilyMapper();

    constructor(
        private readonly findAttachmentFamilyByIdService: CommonFindAttachmentFamilyByIdService,
    ) {}

    async execute(query: CommonFindAttachmentFamilyByIdQuery): Promise<CommonAttachmentFamilyResponse>
    {
        const attachmentFamily = await this.findAttachmentFamilyByIdService.main(
            new CommonAttachmentFamilyId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachmentFamily);
    }
}
