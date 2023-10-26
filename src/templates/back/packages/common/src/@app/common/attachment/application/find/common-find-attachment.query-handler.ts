import { CommonAttachmentMapper, CommonAttachmentResponse, CommonFindAttachmentQuery } from '@app/common/attachment';
import { CommonFindAttachmentService } from '@app/common/attachment/application/find/common-find-attachment.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindAttachmentQuery)
export class CommonFindAttachmentQueryHandler implements IQueryHandler<CommonFindAttachmentQuery>
{
    private readonly mapper: CommonAttachmentMapper = new CommonAttachmentMapper();

    constructor(
        private readonly findAttachmentService: CommonFindAttachmentService,
    ) {}

    async execute(query: CommonFindAttachmentQuery): Promise<CommonAttachmentResponse>
    {
        const attachment = await this.findAttachmentService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachment);
    }
}
