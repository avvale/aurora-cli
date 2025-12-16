import { SupportComment, SupportUpdateCommentByIdInput } from '@api/graphql';
import { SupportUpdateCommentByIdHandler } from '@api/support/comment';
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
@Auth('support.comment.update')
export class SupportUpdateCommentByIdResolver {
    constructor(private readonly handler: SupportUpdateCommentByIdHandler) {}

    @Mutation('supportUpdateCommentById')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('payload') payload: SupportUpdateCommentByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<SupportComment> {
        return await this.handler.main(
            account,
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
