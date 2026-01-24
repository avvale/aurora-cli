import {
  MessageInboxSetting,
  MessageUpdateInboxSettingsInput,
} from '@api/graphql';
import { MessageUpdateInboxSettingsHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.update')
export class MessageUpdateInboxSettingsResolver {
  constructor(private readonly handler: MessageUpdateInboxSettingsHandler) {}

  @Mutation('messageUpdateInboxSettings')
  async main(
    @Args('payload') payload: MessageUpdateInboxSettingsInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageInboxSetting> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
