import { IamPaginateRolesQuery } from '@app/iam/role';
import { IamPaginateRolesService } from '@app/iam/role/application/paginate/iam-paginate-roles.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateRolesQuery)
export class IamPaginateRolesQueryHandler
    implements IQueryHandler<IamPaginateRolesQuery>
{
    constructor(
        private readonly paginateRolesService: IamPaginateRolesService,
    ) {}

    async execute(query: IamPaginateRolesQuery): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateRolesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map((item) => item.toDTO()),
        );
    }
}
