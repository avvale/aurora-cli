import { MessageMessage } from '@api/graphql';
import { TenantConstraint } from '@api/iam/shared';
import { MessageDeleteMessageByIdHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.message.delete')
export class MessageDeleteMessageByIdResolver
{
    constructor(
        private readonly handler: MessageDeleteMessageByIdHandler,
    ) {}

    @Mutation('messageDeleteMessageById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageMessage>
    {
        return await this.handler.main(
            account,
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
