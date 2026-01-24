import { MessageCheckMessagesInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  CurrentAccount,
  Timezone,
} from '@aurorajs.dev/core';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth()
export class MessageCheckMessagesInboxResolver {
  constructor(private readonly handler: MessageCheckMessagesInboxHandler) {}

  @Mutation('messageCheckMessagesInbox')
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(account, timezone, auditing);
  }
}
