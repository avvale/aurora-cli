import { Pagination } from '@api/graphql';
import { IamPaginatePermissionsQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginatePermissionsHandler
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
        return await this.queryBus.ask(new IamPaginatePermissionsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
