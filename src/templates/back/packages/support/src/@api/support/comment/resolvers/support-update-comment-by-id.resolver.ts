import { SupportComment, SupportUpdateCommentByIdInput } from '@api/graphql';
import { SupportUpdateCommentByIdHandler } from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
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
        @Args('payload') payload: SupportUpdateCommentByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<SupportComment> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
