import { MessageMessage } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { MessageFindMessageHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.message.get')
export class MessageFindMessageResolver
{
    constructor(
        private readonly handler: MessageFindMessageHandler,
    ) {}

    @Query('messageFindMessage')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<MessageMessage>
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
