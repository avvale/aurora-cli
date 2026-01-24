import { SupportIssue } from '@api/graphql';
import { SupportFindIssueHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.get')
export class SupportFindIssueResolver {
  constructor(private readonly handler: SupportFindIssueHandler) {}

  @Query('supportFindIssue')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<SupportIssue> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
