import { MessageCreateOutboxInput, MessageOutbox } from '@api/graphql';
import { MessageCreateOutboxDto, MessageOutboxDto } from '@api/message/outbox';
import { MessageCreateOutboxCommand, MessageFindOutboxByIdQuery } from '@app/message/outbox';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateOutboxHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: MessageCreateOutboxInput | MessageCreateOutboxDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageOutbox | MessageOutboxDto>
    {
        await this.commandBus.dispatch(new MessageCreateOutboxCommand(
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
