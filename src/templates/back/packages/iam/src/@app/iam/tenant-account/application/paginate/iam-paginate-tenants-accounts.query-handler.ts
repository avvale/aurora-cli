import { IamPaginateTenantsAccountsQuery } from '@app/iam/tenant-account';
import { IamPaginateTenantsAccountsService } from '@app/iam/tenant-account/application/paginate/iam-paginate-tenants-accounts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateTenantsAccountsQuery)
export class IamPaginateTenantsAccountsQueryHandler implements IQueryHandler<IamPaginateTenantsAccountsQuery>
{
    constructor(
        private readonly paginateTenantsAccountsService: IamPaginateTenantsAccountsService,
    ) {}

    async execute(query: IamPaginateTenantsAccountsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateTenantsAccountsService.main(
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
