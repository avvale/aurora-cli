import { MessageCreateInboxInput, MessageInbox } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageCreateInboxHandler } from '@api/message/inbox';
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
@Auth('message.inbox.create')
export class MessageCreateInboxResolver {
  constructor(private readonly handler: MessageCreateInboxHandler) {}

  @Mutation('messageCreateInbox')
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: MessageCreateInboxInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageInbox> {
    return await this.handler.main(account, payload, timezone, auditing);
  }
}
