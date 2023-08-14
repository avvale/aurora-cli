import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAttachmentFamilyResponse } from '../../domain/common-attachment-family.response';
import { CommonAttachmentFamilyMapper } from '../../domain/common-attachment-family.mapper';
import { CommonRawSQLAttachmentFamiliesQuery } from './common-raw-sql-attachment-families.query';
import { CommonRawSQLAttachmentFamiliesService } from './common-raw-sql-attachment-families.service';

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
