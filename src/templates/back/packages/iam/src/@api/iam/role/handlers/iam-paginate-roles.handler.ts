import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateRolesQuery } from '@app/iam/role/application/paginate/paginate-roles.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class IamPaginateRolesHandler
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
        return await this.queryBus.ask(new PaginateRolesQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}