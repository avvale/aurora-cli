import { MessageOutbox, MessageUpdateOutboxByIdInput } from '@api/graphql';
import { MessageOutboxDto, MessageUpdateOutboxByIdDto } from '@api/message/outbox';
import { MessageFindOutboxByIdQuery, MessageUpdateOutboxByIdCommand } from '@app/message/outbox';
import { AuditingMeta, diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateOutboxByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: MessageUpdateOutboxByIdInput | MessageUpdateOutboxByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageOutbox | MessageOutboxDto>
    {
        const outbox = await this.queryBus.ask(new MessageFindOutboxByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, outbox);

        await this.commandBus.dispatch(new MessageUpdateOutboxByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageFindOutboxByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
