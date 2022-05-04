import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from 'aurora-ts-core';
import { PaginatePermissionsQuery } from './paginate-permissions.query';
import { PaginatePermissionsService } from './paginate-permissions.service';

@QueryHandler(PaginatePermissionsQuery)
export class PaginatePermissionsQueryHandler implements IQueryHandler<PaginatePermissionsQuery>
{
    constructor(
        private readonly paginatePermissionsService: PaginatePermissionsService,
    ) {}

    async execute(query: PaginatePermissionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginatePermissionsService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}