import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAttachmentFamilyResponse } from '../../domain/common-attachment-family.response';
import { CommonAttachmentFamilyMapper } from '../../domain/common-attachment-family.mapper';
import { CommonGetAttachmentFamiliesQuery } from './common-get-attachment-families.query';
import { CommonGetAttachmentFamiliesService } from './common-get-attachment-families.service';

@QueryHandler(CommonGetAttachmentFamiliesQuery)
export class CommonGetAttachmentFamiliesQueryHandler implements IQueryHandler<CommonGetAttachmentFamiliesQuery>
{
    private readonly mapper: CommonAttachmentFamilyMapper = new CommonAttachmentFamilyMapper();

    constructor(
        private readonly getAttachmentFamiliesService: CommonGetAttachmentFamiliesService,
    ) {}

    async execute(query: CommonGetAttachmentFamiliesQuery): Promise<CommonAttachmentFamilyResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAttachmentFamiliesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
