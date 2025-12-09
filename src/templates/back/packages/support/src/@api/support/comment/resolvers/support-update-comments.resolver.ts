import { SupportComment, SupportUpdateCommentsInput } from '@api/graphql';
import { SupportUpdateCommentsHandler } from '@api/support/comment';
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
export class SupportUpdateCommentsResolver {
    constructor(private readonly handler: SupportUpdateCommentsHandler) {}

    @Mutation('supportUpdateComments')
    async main(
        @Args('payload') payload: SupportUpdateCommentsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<SupportComment> {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
