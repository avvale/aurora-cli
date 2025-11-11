import { Pagination } from '@api/graphql';
import { OAuthPaginateApplicationsQuery } from '@app/o-auth/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateApplicationsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new OAuthPaginateApplicationsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
