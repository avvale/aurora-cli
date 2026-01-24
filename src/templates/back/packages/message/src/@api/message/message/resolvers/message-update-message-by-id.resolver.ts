import { MessageMessage, MessageUpdateMessageByIdInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageUpdateMessageByIdHandler } from '@api/message/message';
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
@Auth('message.message.update')
export class MessageUpdateMessageByIdResolver {
  constructor(private readonly handler: MessageUpdateMessageByIdHandler) {}

  @Mutation('messageUpdateMessageById')
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: MessageUpdateMessageByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageMessage> {
    return await this.handler.main(
      account,
      payload,
      constraint,
      timezone,
      auditing,
    );
  }
}
