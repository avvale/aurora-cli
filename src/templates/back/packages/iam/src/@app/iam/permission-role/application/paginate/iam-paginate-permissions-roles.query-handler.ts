import { IamPaginatePermissionsRolesQuery } from '@app/iam/permission-role';
import { IamPaginatePermissionsRolesService } from '@app/iam/permission-role/application/paginate/iam-paginate-permissions-roles.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
