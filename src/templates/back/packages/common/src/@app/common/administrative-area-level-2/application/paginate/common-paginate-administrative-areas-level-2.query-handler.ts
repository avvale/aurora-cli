import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateAdministrativeAreasLevel2Query } from './common-paginate-administrative-areas-level-2.query';
import { CommonPaginateAdministrativeAreasLevel2Service } from './common-paginate-administrative-areas-level-2.service';

@QueryHandler(CommonPaginateAdministrativeAreasLevel2Query)
export class CommonPaginateAdministrativeAreasLevel2QueryHandler implements IQueryHandler<CommonPaginateAdministrativeAreasLevel2Query>
{
    constructor(
        private readonly paginateAdministrativeAreasLevel2Service: CommonPaginateAdministrativeAreasLevel2Service,
    ) {}

    async execute(query: CommonPaginateAdministrativeAreasLevel2Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAdministrativeAreasLevel2Service.main(
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
