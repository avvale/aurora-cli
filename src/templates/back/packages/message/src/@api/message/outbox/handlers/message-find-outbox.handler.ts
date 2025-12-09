import { MessageOutbox } from '@api/graphql';
import { MessageOutboxDto } from '@api/message/outbox';
import { MessageFindOutboxQuery } from '@app/message/outbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindOutboxHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<MessageOutbox | MessageOutboxDto> {
        return await this.queryBus.ask(
            new MessageFindOutboxQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
