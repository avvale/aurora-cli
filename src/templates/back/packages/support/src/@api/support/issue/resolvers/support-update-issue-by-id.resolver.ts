import { SupportIssue, SupportUpdateIssueByIdInput } from '@api/graphql';
import { SupportUpdateIssueByIdHandler } from '@api/support/issue';
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
@Auth('support.issue.update')
export class SupportUpdateIssueByIdResolver {
  constructor(private readonly handler: SupportUpdateIssueByIdHandler) {}

  @Mutation('supportUpdateIssueById')
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: SupportUpdateIssueByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<SupportIssue> {
    return await this.handler.main(
      account,
      payload,
      constraint,
      timezone,
      auditing,
    );
  }
}
