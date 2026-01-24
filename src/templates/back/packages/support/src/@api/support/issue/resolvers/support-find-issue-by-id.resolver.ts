import { SupportIssue } from '@api/graphql';
import { SupportFindIssueByIdHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.get')
export class SupportFindIssueByIdResolver {
  constructor(private readonly handler: SupportFindIssueByIdHandler) {}

  @Query('supportFindIssueById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<SupportIssue> {
    return await this.handler.main(id, constraint, timezone);
  }
}
