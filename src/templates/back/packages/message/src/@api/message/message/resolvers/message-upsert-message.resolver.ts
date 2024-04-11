import { MessageMessage, MessageUpdateMessageByIdInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageUpsertMessageHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.message.upsert')
export class MessageUpsertMessageResolver
{
    constructor(
        private readonly handler: MessageUpsertMessageHandler,
    ) {}

    @Mutation('messageUpsertMessage')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('payload') payload: MessageUpdateMessageByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageMessage>
    {
        return await this.handler.main(
            account,
            payload,
            timezone,
            auditing,
        );
    }
}
