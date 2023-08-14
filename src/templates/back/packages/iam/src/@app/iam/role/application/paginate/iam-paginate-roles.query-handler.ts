import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginateRolesQuery } from './iam-paginate-roles.query';
import { IamPaginateRolesService } from './iam-paginate-roles.service';

@QueryHandler(IamPaginateRolesQuery)
export class IamPaginateRolesQueryHandler implements IQueryHandler<IamPaginateRolesQuery>
{
    constructor(
        private readonly paginateRolesService: IamPaginateRolesService,
    ) {}

    async execute(query: IamPaginateRolesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateRolesService.main(
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
