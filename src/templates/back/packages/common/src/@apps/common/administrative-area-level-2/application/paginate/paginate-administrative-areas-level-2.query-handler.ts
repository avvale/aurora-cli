import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateAdministrativeAreasLevel2Query } from './paginate-administrative-areas-level-2.query';
import { PaginateAdministrativeAreasLevel2Service } from './paginate-administrative-areas-level-2.service';

@QueryHandler(PaginateAdministrativeAreasLevel2Query)
export class PaginateAdministrativeAreasLevel2QueryHandler implements IQueryHandler<PaginateAdministrativeAreasLevel2Query>
{
    constructor(
        private readonly paginateAdministrativeAreasLevel2Service: PaginateAdministrativeAreasLevel2Service,
    ) {}

    async execute(query: PaginateAdministrativeAreasLevel2Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAdministrativeAreasLevel2Service.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}