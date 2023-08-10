import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginateAccountsQuery } from './iam-paginate-accounts.query';
import { IamPaginateAccountsService } from './iam-paginate-accounts.service';

@QueryHandler(IamPaginateAccountsQuery)
export class IamPaginateAccountsQueryHandler implements IQueryHandler<IamPaginateAccountsQuery>
{
    constructor(
        private readonly paginateAccountsService: IamPaginateAccountsService,
    ) {}

    async execute(query: IamPaginateAccountsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAccountsService.main(
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
