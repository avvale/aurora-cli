import { IamPaginateRolesAccountsQuery } from '@app/iam/role-account';
import { IamPaginateRolesAccountsService } from '@app/iam/role-account/application/paginate/iam-paginate-roles-accounts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateRolesAccountsQuery)
export class IamPaginateRolesAccountsQueryHandler implements IQueryHandler<IamPaginateRolesAccountsQuery>
{
    constructor(
        private readonly paginateRolesAccountsService: IamPaginateRolesAccountsService,
    ) {}

    async execute(query: IamPaginateRolesAccountsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateRolesAccountsService.main(
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
