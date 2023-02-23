import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginatePermissionsQuery } from '@app/iam/permission/application/paginate/paginate-permissions.query';
import { Pagination } from '@api/graphql';

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
        return await this.queryBus.ask(new PaginatePermissionsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}