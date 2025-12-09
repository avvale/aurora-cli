import { MessageOutbox } from '@api/graphql';
import { MessageOutboxDto } from '@api/message/outbox';
import { MessageFindOutboxByIdQuery } from '@app/message/outbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindOutboxByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<MessageOutbox | MessageOutboxDto> {
        return await this.queryBus.ask(
            new MessageFindOutboxByIdQuery(id, constraint, {
                timezone,
            }),
        );
    }
}
