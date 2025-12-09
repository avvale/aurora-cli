import { Pagination } from '@api/graphql';
import { SupportPaginateCommentsHandler } from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.comment.get')
export class SupportPaginateCommentsResolver {
    constructor(private readonly handler: SupportPaginateCommentsHandler) {}

    @Query('supportPaginateComments')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
