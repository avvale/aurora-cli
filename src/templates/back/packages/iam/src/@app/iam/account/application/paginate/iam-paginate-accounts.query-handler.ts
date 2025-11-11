import { IamPaginateAccountsQuery } from '@app/iam/account';
import { IamPaginateAccountsService } from '@app/iam/account/application/paginate/iam-paginate-accounts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateAccountsQuery)
export class IamPaginateAccountsQueryHandler
    implements IQueryHandler<IamPaginateAccountsQuery>
{
    constructor(
        private readonly paginateAccountsService: IamPaginateAccountsService,
    ) {}

    async execute(
        query: IamPaginateAccountsQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateAccountsService.main(
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
