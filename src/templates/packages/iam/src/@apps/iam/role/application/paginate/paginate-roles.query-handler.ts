import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from 'aurora-ts-core';
import { PaginateRolesQuery } from './paginate-roles.query';
import { PaginateRolesService } from './paginate-roles.service';

@QueryHandler(PaginateRolesQuery)
export class PaginateRolesQueryHandler implements IQueryHandler<PaginateRolesQuery>
{
    constructor(
        private readonly paginateRolesService: PaginateRolesService,
    ) {}

    async execute(query: PaginateRolesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateRolesService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}