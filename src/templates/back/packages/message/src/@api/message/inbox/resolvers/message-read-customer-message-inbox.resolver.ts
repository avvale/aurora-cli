import { MessageUpdateInboxByIdInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageReadCustomerMessageInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    CurrentAccount,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inbox.update')
export class MessageReadCustomerMessageInboxResolver {
    constructor(
        private readonly handler: MessageReadCustomerMessageInboxHandler,
    ) {}

    @Mutation('messageReadCustomerMessageInbox')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('inbox') inbox: MessageUpdateInboxByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean> {
        return await this.handler.main(
            account,
            inbox,
            constraint,
            timezone,
            auditing,
        );
    }
}
