import { MessageInbox } from '@api/graphql';
import { MessageFindCustomerMessageInboxHandler } from '@api/message/inbox';
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { IamAccountResponse } from '@app/iam/account';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@UseGuards(AuthenticationJwtGuard)
export class MessageFindCustomerMessageInboxResolver
{
    constructor(
        private readonly handler: MessageFindCustomerMessageInboxHandler,
    ) {}

    @Query('messageFindCustomerMessageInbox')
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
