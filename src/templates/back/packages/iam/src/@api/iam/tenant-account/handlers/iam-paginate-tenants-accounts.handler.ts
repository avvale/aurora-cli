import { Pagination } from '@api/graphql';
import { IamPaginateTenantsAccountsQuery } from '@app/iam/tenant-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginateTenantsAccountsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new IamPaginateTenantsAccountsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
