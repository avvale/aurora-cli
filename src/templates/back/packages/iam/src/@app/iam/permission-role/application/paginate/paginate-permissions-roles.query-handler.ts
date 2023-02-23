import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurora-ts/core';
import { PaginatePermissionsRolesQuery } from './paginate-permissions-roles.query';
import { PaginatePermissionsRolesService } from './paginate-permissions-roles.service';

@QueryHandler(PaginatePermissionsRolesQuery)
export class PaginatePermissionsRolesQueryHandler implements IQueryHandler<PaginatePermissionsRolesQuery>
{
    constructor(
        private readonly paginatePermissionsRolesService: PaginatePermissionsRolesService,
    ) {}

    async execute(query: PaginatePermissionsRolesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginatePermissionsRolesService.main(
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