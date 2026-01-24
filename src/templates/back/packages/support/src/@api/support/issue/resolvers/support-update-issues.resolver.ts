import { SupportIssue, SupportUpdateIssuesInput } from '@api/graphql';
import { SupportUpdateIssuesHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.update')
export class SupportUpdateIssuesResolver {
  constructor(private readonly handler: SupportUpdateIssuesHandler) {}

  @Mutation('supportUpdateIssues')
  async main(
    @Args('payload') payload: SupportUpdateIssuesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<SupportIssue> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
