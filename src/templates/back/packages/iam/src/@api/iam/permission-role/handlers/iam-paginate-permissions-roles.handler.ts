import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginatePermissionsRolesQuery } from '@app/iam/permission-role/application/paginate/paginate-permissions-roles.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class IamPaginatePermissionsRolesHandler
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
        return await this.queryBus.ask(new PaginatePermissionsRolesQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}