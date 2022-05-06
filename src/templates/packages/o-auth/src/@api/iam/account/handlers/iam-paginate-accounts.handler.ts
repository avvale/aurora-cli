import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateAccountsQuery } from '../../../../@apps/iam/account/application/paginate/paginate-accounts.query';
import { Pagination } from '../../../../graphql';

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
        return await this.queryBus.ask(new PaginateAccountsQuery(queryStatement, constraint, { timezone }));
    }
}