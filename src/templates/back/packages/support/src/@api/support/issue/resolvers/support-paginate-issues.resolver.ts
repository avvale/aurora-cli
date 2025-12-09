import { Pagination } from '@api/graphql';
import { SupportPaginateIssuesHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.get')
export class SupportPaginateIssuesResolver {
    constructor(private readonly handler: SupportPaginateIssuesHandler) {}

    @Query('supportPaginateIssues')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
