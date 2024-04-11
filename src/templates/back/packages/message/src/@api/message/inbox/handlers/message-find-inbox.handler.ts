import { MessageInbox } from '@api/graphql';
import { MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindInboxQuery } from '@app/message/inbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindInboxHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<MessageInbox | MessageInboxDto>
    {
        return await this.queryBus.ask(new MessageFindInboxQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
