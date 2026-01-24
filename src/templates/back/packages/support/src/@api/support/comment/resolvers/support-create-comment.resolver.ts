import { SupportComment, SupportCreateCommentInput } from '@api/graphql';
import { SupportCreateCommentHandler } from '@api/support/comment';
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
@Auth('support.comment.create')
export class SupportCreateCommentResolver {
  constructor(private readonly handler: SupportCreateCommentHandler) {}

  @Mutation('supportCreateComment')
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: SupportCreateCommentInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<SupportComment> {
    return await this.handler.main(account, payload, timezone, auditing);
  }
}
