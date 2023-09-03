import { CommonAttachmentFamilyMapper, CommonAttachmentFamilyResponse, CommonRawSQLAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { CommonRawSQLAttachmentFamiliesService } from '@app/common/attachment-family/application/raw-sql/common-raw-sql-attachment-families.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonRawSQLAttachmentFamiliesQuery)
export class CommonRawSQLAttachmentFamiliesQueryHandler implements IQueryHandler<CommonRawSQLAttachmentFamiliesQuery>
{
    private readonly mapper: CommonAttachmentFamilyMapper = new CommonAttachmentFamilyMapper();

    constructor(
        private readonly rawSQLAttachmentFamiliesService: CommonRawSQLAttachmentFamiliesService,
    ) {}

    async execute(query: CommonRawSQLAttachmentFamiliesQuery): Promise<CommonAttachmentFamilyResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAttachmentFamiliesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
