import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginatePermissionsRolesQuery } from './iam-paginate-permissions-roles.query';
import { IamPaginatePermissionsRolesService } from './iam-paginate-permissions-roles.service';

@QueryHandler(IamPaginatePermissionsRolesQuery)
export class IamPaginatePermissionsRolesQueryHandler implements IQueryHandler<IamPaginatePermissionsRolesQuery>
{
    constructor(
        private readonly paginatePermissionsRolesService: IamPaginatePermissionsRolesService,
    ) {}

    async execute(query: IamPaginatePermissionsRolesQuery): Promise<PaginationResponse>
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