import { MessageInboxSetting } from '@api/graphql';
import { MessageDeleteInboxSettingsHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.delete')
export class MessageDeleteInboxSettingsResolver {
  constructor(private readonly handler: MessageDeleteInboxSettingsHandler) {}

  @Mutation('messageDeleteInboxSettings')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageInboxSetting[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
