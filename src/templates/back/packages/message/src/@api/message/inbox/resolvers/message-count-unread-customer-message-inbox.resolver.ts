import { MessageInbox } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { MessageCountUnreadCustomerMessageInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inbox.get')
export class MessageCountUnreadCustomerMessageInboxResolver
{
    constructor(
        private readonly handler: MessageCountUnreadCustomerMessageInboxHandler,
    ) {}

    @Query('messageCountUnreadCustomerMessageInbox')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
    ): Promise<number>
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
        );
    }
}
