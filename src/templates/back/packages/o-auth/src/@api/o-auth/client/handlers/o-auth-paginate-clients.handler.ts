import { Pagination } from '@api/graphql';
import { OAuthPaginateClientsQuery } from '@app/o-auth/client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateClientsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new OAuthPaginateClientsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
