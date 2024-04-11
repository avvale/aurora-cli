import { MessageInbox } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { MessageFindInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inbox.get')
export class MessageFindInboxResolver
{
    constructor(
        private readonly handler: MessageFindInboxHandler,
    ) {}

    @Query('messageFindInbox')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<MessageInbox>
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
