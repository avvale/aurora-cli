import { MessageOutbox, MessageUpdateOutboxByIdInput } from '@api/graphql';
import { MessageOutboxDto, MessageUpdateOutboxByIdDto } from '@api/message/outbox';
import { MessageFindOutboxByIdQuery, MessageUpsertOutboxCommand } from '@app/message/outbox';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpsertOutboxHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: MessageUpdateOutboxByIdInput | MessageUpdateOutboxByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageOutbox | MessageOutboxDto>
    {
        await this.commandBus.dispatch(new MessageUpsertOutboxCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageFindOutboxByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
