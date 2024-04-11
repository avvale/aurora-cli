import { MessageInbox, MessageUpdateInboxesInput } from '@api/graphql';
import { MessageInboxDto, MessageUpdateInboxesDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageGetInboxesQuery, MessageUpdateInboxesCommand } from '@app/message/inbox';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateInboxesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageUpdateInboxesInput | MessageUpdateInboxesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInbox | MessageInboxDto>
    {
        await this.commandBus.dispatch(new MessageUpdateInboxesCommand(
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

        return await this.queryBus.ask(new MessageGetInboxesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
