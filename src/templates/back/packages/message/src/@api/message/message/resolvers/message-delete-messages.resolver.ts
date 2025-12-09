import { MessageMessage } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { MessageDeleteMessagesHandler } from '@api/message/message';
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
@Auth('message.message.delete')
export class MessageDeleteMessagesResolver {
    constructor(private readonly handler: MessageDeleteMessagesHandler) {}

    @Mutation('messageDeleteMessages')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageMessage[]> {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
