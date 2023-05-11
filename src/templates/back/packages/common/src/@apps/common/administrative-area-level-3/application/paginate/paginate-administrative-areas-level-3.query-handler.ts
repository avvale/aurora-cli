import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateAdministrativeAreasLevel3Query } from './paginate-administrative-areas-level-3.query';
import { PaginateAdministrativeAreasLevel3Service } from './paginate-administrative-areas-level-3.service';

@QueryHandler(PaginateAdministrativeAreasLevel3Query)
export class PaginateAdministrativeAreasLevel3QueryHandler implements IQueryHandler<PaginateAdministrativeAreasLevel3Query>
{
    constructor(
        private readonly paginateAdministrativeAreasLevel3Service: PaginateAdministrativeAreasLevel3Service,
    ) {}

    async execute(query: PaginateAdministrativeAreasLevel3Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAdministrativeAreasLevel3Service.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}