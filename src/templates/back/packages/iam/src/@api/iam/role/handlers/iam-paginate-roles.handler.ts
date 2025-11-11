import { Pagination } from '@api/graphql';
import { IamPaginateRolesQuery } from '@app/iam/role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginateRolesHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new IamPaginateRolesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
