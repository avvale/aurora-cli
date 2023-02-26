import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateUsersQuery } from '@app/iam/user/application/paginate/paginate-users.query';
import { Pagination } from '@api/graphql';

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
        return await this.queryBus.ask(new PaginateUsersQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}