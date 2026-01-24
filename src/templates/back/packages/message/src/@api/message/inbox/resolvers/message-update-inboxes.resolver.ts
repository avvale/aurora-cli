import { MessageInbox, MessageUpdateInboxesInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageUpdateInboxesHandler } from '@api/message/inbox';
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
@Auth('message.inbox.update')
export class MessageUpdateInboxesResolver {
  constructor(private readonly handler: MessageUpdateInboxesHandler) {}

  @Mutation('messageUpdateInboxes')
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: MessageUpdateInboxesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageInbox> {
    return await this.handler.main(
      account,
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
