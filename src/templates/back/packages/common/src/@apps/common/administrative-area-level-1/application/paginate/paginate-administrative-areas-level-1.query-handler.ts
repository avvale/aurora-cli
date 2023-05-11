import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateAdministrativeAreasLevel1Query } from './paginate-administrative-areas-level-1.query';
import { PaginateAdministrativeAreasLevel1Service } from './paginate-administrative-areas-level-1.service';

@QueryHandler(PaginateAdministrativeAreasLevel1Query)
export class PaginateAdministrativeAreasLevel1QueryHandler implements IQueryHandler<PaginateAdministrativeAreasLevel1Query>
{
    constructor(
        private readonly paginateAdministrativeAreasLevel1Service: PaginateAdministrativeAreasLevel1Service,
    ) {}

    async execute(query: PaginateAdministrativeAreasLevel1Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAdministrativeAreasLevel1Service.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}