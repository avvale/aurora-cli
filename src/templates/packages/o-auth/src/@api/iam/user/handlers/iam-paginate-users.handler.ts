import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateUsersQuery } from '../../../../@apps/iam/user/application/paginate/paginate-users.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class IamPaginateUsersHandler
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
        return await this.queryBus.ask(new PaginateUsersQuery(queryStatement, constraint, { timezone }));
    }
}