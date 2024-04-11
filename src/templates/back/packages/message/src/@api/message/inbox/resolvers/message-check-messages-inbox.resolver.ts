import { MessageCheckMessagesInboxHandler } from '@api/message/inbox';
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { IamAccountResponse } from '@app/iam/account';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@UseGuards(AuthenticationJwtGuard)
export class MessageCheckMessagesInboxResolver
{
    constructor(
        private readonly handler: MessageCheckMessagesInboxHandler,
    ) {}

    @Mutation('messageCheckMessagesInbox')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            account,
            timezone,
            auditing,
        );
    }
}
