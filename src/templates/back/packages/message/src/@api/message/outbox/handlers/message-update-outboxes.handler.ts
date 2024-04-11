import { MessageOutbox, MessageUpdateOutboxesInput } from '@api/graphql';
import { MessageOutboxDto, MessageUpdateOutboxesDto } from '@api/message/outbox';
import { MessageGetOutboxesQuery, MessageUpdateOutboxesCommand } from '@app/message/outbox';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateOutboxesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: MessageUpdateOutboxesInput | MessageUpdateOutboxesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageOutbox | MessageOutboxDto>
    {
        await this.commandBus.dispatch(new MessageUpdateOutboxesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageGetOutboxesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
