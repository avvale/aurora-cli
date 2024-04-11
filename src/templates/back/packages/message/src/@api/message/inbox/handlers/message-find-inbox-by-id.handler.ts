import { MessageInbox } from '@api/graphql';
import { MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindInboxByIdQuery } from '@app/message/inbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindInboxByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<MessageInbox | MessageInboxDto>
    {
        return await this.queryBus.ask(new MessageFindInboxByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
