import { MessageMessage, MessageUpdateMessagesInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageUpdateMessagesHandler } from '@api/message/message';
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
export class MessageUpdateMessagesResolver {
  constructor(private readonly handler: MessageUpdateMessagesHandler) {}

  @Mutation('messageUpdateMessages')
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: MessageUpdateMessagesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageMessage> {
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
