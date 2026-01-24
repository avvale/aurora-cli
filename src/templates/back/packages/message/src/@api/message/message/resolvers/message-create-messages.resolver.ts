import { MessageCreateMessageInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageCreateMessagesHandler } from '@api/message/message';
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
@Auth('message.message.create')
export class MessageCreateMessagesResolver {
  constructor(private readonly handler: MessageCreateMessagesHandler) {}

  @Mutation('messageCreateMessages')
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: MessageCreateMessageInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(account, payload, timezone, auditing);
  }
}
