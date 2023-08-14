import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAttachmentFamilyResponse } from '../../domain/common-attachment-family.response';
import { CommonAttachmentFamilyMapper } from '../../domain/common-attachment-family.mapper';
import { CommonFindAttachmentFamilyQuery } from './common-find-attachment-family.query';
import { CommonFindAttachmentFamilyService } from './common-find-attachment-family.service';

@QueryHandler(CommonFindAttachmentFamilyQuery)
export class CommonFindAttachmentFamilyQueryHandler implements IQueryHandler<CommonFindAttachmentFamilyQuery>
{
    private readonly mapper: CommonAttachmentFamilyMapper = new CommonAttachmentFamilyMapper();

    constructor(
        private readonly findAttachmentFamilyService: CommonFindAttachmentFamilyService,
    ) {}

    async execute(query: CommonFindAttachmentFamilyQuery): Promise<CommonAttachmentFamilyResponse>
    {
        const attachmentFamily = await this.findAttachmentFamilyService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachmentFamily);
    }
}
