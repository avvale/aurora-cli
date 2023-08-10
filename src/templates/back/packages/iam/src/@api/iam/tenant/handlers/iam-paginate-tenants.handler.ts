import { Pagination } from '@api/graphql';
import { IamPaginateTenantsQuery } from '@app/iam/tenant';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginateTenantsHandler
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
        return await this.queryBus.ask(new IamPaginateTenantsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
