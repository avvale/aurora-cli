import { MessageInbox } from '@api/graphql';
import { MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageDeleteInboxByIdCommand, MessageFindInboxByIdQuery } from '@app/message/inbox';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteInboxByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInbox | MessageInboxDto>
    {
        const inbox = await this.queryBus.ask(new MessageFindInboxByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new MessageDeleteInboxByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return inbox;
    }
}
