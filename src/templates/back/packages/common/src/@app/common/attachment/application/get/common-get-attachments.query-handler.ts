import { CommonAttachmentMapper, CommonAttachmentResponse, CommonGetAttachmentsQuery } from '@app/common/attachment';
import { CommonGetAttachmentsService } from '@app/common/attachment/application/get/common-get-attachments.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetAttachmentsQuery)
export class CommonGetAttachmentsQueryHandler implements IQueryHandler<CommonGetAttachmentsQuery>
{
    private readonly mapper: CommonAttachmentMapper = new CommonAttachmentMapper();

    constructor(
        private readonly getAttachmentsService: CommonGetAttachmentsService,
    ) {}

    async execute(query: CommonGetAttachmentsQuery): Promise<CommonAttachmentResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getAttachmentsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
