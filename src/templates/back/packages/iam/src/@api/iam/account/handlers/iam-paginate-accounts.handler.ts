import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateAccountsQuery } from '@app/iam/account/application/paginate/paginate-accounts.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class IamPaginateAccountsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAccountsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}