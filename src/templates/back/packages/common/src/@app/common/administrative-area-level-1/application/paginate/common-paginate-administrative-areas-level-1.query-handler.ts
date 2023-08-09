import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { CommonPaginateAdministrativeAreasLevel1Query } from './common-paginate-administrative-areas-level-1.query';
import { CommonPaginateAdministrativeAreasLevel1Service } from './common-paginate-administrative-areas-level-1.service';

@QueryHandler(CommonPaginateAdministrativeAreasLevel1Query)
export class CommonPaginateAdministrativeAreasLevel1QueryHandler implements IQueryHandler<CommonPaginateAdministrativeAreasLevel1Query>
{
    constructor(
        private readonly paginateAdministrativeAreasLevel1Service: CommonPaginateAdministrativeAreasLevel1Service,
    ) {}

    async execute(query: CommonPaginateAdministrativeAreasLevel1Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAdministrativeAreasLevel1Service.main(
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
