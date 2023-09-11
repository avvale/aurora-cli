import { Pagination } from '@api/graphql';
import { IamPaginateRolesAccountsQuery } from '@app/iam/role-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginateRolesAccountsHandler
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
        return await this.queryBus.ask(new IamPaginateRolesAccountsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
