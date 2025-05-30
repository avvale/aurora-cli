import { MessageUpdateMessageByIdInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageSendMessageMessageHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.message.update')
export class MessageSendMessageMessageResolver
{
    constructor(
        private readonly handler: MessageSendMessageMessageHandler,
    ) {}

    @Mutation('messageSendMessageMessage')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('message') message: MessageUpdateMessageByIdInput, // set message to pass TenantPolicy
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            account,
            message,
            constraint,
            timezone,
            auditing,
        );
    }
}
