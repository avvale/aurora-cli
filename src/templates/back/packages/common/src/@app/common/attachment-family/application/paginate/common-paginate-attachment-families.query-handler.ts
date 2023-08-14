import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateAttachmentFamiliesQuery } from './common-paginate-attachment-families.query';
import { CommonPaginateAttachmentFamiliesService } from './common-paginate-attachment-families.service';

@QueryHandler(CommonPaginateAttachmentFamiliesQuery)
export class CommonPaginateAttachmentFamiliesQueryHandler implements IQueryHandler<CommonPaginateAttachmentFamiliesQuery>
{
    constructor(
        private readonly paginateAttachmentFamiliesService: CommonPaginateAttachmentFamiliesService,
    ) {}

    async execute(query: CommonPaginateAttachmentFamiliesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAttachmentFamiliesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
