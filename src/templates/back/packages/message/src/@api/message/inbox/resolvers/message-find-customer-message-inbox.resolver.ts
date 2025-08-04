import { MessageInbox } from '@api/graphql';
import { MessageFindCustomerMessageInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth()
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
