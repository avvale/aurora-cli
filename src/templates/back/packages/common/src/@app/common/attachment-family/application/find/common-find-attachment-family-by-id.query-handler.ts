import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAttachmentFamilyResponse } from '../../domain/common-attachment-family.response';
import { CommonAttachmentFamilyMapper } from '../../domain/common-attachment-family.mapper';
import { CommonAttachmentFamilyId } from '../../domain/value-objects';
import { CommonFindAttachmentFamilyByIdQuery } from './common-find-attachment-family-by-id.query';
import { CommonFindAttachmentFamilyByIdService } from './common-find-attachment-family-by-id.service';

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
