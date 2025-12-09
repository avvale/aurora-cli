import { SupportIssue } from '@api/graphql';
import { SupportGetIssuesHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.get')
export class SupportGetIssuesResolver {
    constructor(private readonly handler: SupportGetIssuesHandler) {}

    @Query('supportGetIssues')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<SupportIssue[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
