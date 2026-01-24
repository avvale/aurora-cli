import { MessageUpdateMessageByIdInput } from '@api/graphql';
import { TenantPolicy } from '@api/iam/shared';
import { MessageRemoveAttachmentMessageHandler } from '@api/message/message';
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
export class MessageRemoveAttachmentMessageResolver {
  constructor(
    private readonly handler: MessageRemoveAttachmentMessageHandler,
  ) {}

  @Mutation('messageRemoveAttachmentMessage')
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('message') message: MessageUpdateMessageByIdInput, // set message to pass TenantPolicy
    @Args('attachmentId') attachmentId: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(
      account,
      message,
      attachmentId,
      constraint,
      timezone,
      auditing,
    );
  }
}
