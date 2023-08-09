import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateAdministrativeAreasLevel3Query } from './common-paginate-administrative-areas-level-3.query';
import { CommonPaginateAdministrativeAreasLevel3Service } from './common-paginate-administrative-areas-level-3.service';

@QueryHandler(CommonPaginateAdministrativeAreasLevel3Query)
export class CommonPaginateAdministrativeAreasLevel3QueryHandler implements IQueryHandler<CommonPaginateAdministrativeAreasLevel3Query>
{
    constructor(
        private readonly paginateAdministrativeAreasLevel3Service: CommonPaginateAdministrativeAreasLevel3Service,
    ) {}

    async execute(query: CommonPaginateAdministrativeAreasLevel3Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAdministrativeAreasLevel3Service.main(
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
