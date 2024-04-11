import { MessageInbox } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { MessageDeleteInboxesHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inbox.delete')
export class MessageDeleteInboxesResolver
{
    constructor(
        private readonly handler: MessageDeleteInboxesHandler,
    ) {}

    @Mutation('messageDeleteInboxes')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageInbox[]>
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
