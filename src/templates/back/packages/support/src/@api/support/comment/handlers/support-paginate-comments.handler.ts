import { Pagination } from '@api/graphql';
import { SupportPaginateCommentsQuery } from '@app/support/comment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportPaginateCommentsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new SupportPaginateCommentsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
