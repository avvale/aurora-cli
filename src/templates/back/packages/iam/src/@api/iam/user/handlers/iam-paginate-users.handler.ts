import { Pagination } from '@api/graphql';
import { IamPaginateUsersQuery } from '@app/iam/user';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new IamPaginateUsersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
