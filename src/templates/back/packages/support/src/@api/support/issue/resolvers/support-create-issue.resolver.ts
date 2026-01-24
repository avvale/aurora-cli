import { SupportCreateIssueInput, SupportIssue } from '@api/graphql';
import { mapResolverFileWithStream } from '@api/storage-account/shared';
import { SupportCreateIssueHandler } from '@api/support/issue';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  CurrentAccount,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.create')
export class SupportCreateIssueResolver {
  constructor(private readonly handler: SupportCreateIssueHandler) {}

  @Mutation('supportCreateIssue')
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: SupportCreateIssueInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<SupportIssue> {
    payload.screenRecording = await mapResolverFileWithStream(
      payload.screenRecording,
    );
    return await this.handler.main(account, payload, timezone, auditing);
  }
}
