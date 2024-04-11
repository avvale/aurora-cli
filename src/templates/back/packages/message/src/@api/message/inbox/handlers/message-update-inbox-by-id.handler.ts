import { MessageInbox, MessageUpdateInboxByIdInput } from '@api/graphql';
import { MessageInboxDto, MessageUpdateInboxByIdDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindInboxByIdQuery, MessageUpdateInboxByIdCommand } from '@app/message/inbox';
import { AuditingMeta, diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateInboxByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageUpdateInboxByIdInput | MessageUpdateInboxByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInbox | MessageInboxDto>
    {
        const inbox = await this.queryBus.ask(new MessageFindInboxByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, inbox);

        await this.commandBus.dispatch(new MessageUpdateInboxByIdCommand(
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

        return await this.queryBus.ask(new MessageFindInboxByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
