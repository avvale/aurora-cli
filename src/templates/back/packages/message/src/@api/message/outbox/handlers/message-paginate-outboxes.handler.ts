import { Pagination } from '@api/graphql';
import { MessagePaginateOutboxesQuery } from '@app/message/outbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagePaginateOutboxesHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new MessagePaginateOutboxesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
