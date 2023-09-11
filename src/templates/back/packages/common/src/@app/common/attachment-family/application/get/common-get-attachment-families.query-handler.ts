import { CommonAttachmentFamilyMapper, CommonAttachmentFamilyResponse, CommonGetAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { CommonGetAttachmentFamiliesService } from '@app/common/attachment-family/application/get/common-get-attachment-families.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetAttachmentFamiliesQuery)
export class CommonGetAttachmentFamiliesQueryHandler implements IQueryHandler<CommonGetAttachmentFamiliesQuery>
{
    private readonly mapper: CommonAttachmentFamilyMapper = new CommonAttachmentFamilyMapper();

    constructor(
        private readonly getAttachmentFamiliesService: CommonGetAttachmentFamiliesService,
    ) {}

    async execute(query: CommonGetAttachmentFamiliesQuery): Promise<CommonAttachmentFamilyResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getAttachmentFamiliesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
