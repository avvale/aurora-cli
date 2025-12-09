import { MessageOutbox } from '@api/graphql';
import { MessageOutboxDto } from '@api/message/outbox';
import {
    MessageDeleteOutboxByIdCommand,
    MessageFindOutboxByIdQuery,
} from '@app/message/outbox';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteOutboxByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageOutbox | MessageOutboxDto> {
        const outbox = await this.queryBus.ask(
            new MessageFindOutboxByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new MessageDeleteOutboxByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return outbox;
    }
}
