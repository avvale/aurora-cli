import { Pagination } from '@api/graphql';
import { MessagePaginateCustomerMessagesInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth()
export class MessagePaginateCustomerMessagesInboxResolver
{
    constructor(
        private readonly handler: MessagePaginateCustomerMessagesInboxHandler,
    ) {}

    @Query('messagePaginateCustomerMessagesInbox')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
