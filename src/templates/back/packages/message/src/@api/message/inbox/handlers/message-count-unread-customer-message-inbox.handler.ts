import { MessageInboxDto } from '../dto';
import { MessageInbox } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import { MessageCountInboxQuery } from '@app/message/inbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCountUnreadCustomerMessageInboxHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
    ): Promise<number>
    {
        return await this.queryBus.ask(new MessageCountInboxQuery(
            {
                ...queryStatement,
                where: {
                    ...queryStatement?.where,
                    accountId: account.id,
                    isRead   : false,
                },
            },
            constraint,
        ));
    }
}