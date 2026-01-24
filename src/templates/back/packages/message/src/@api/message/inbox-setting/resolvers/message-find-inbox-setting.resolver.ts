import { MessageInboxSetting } from '@api/graphql';
import { MessageFindInboxSettingHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.get')
export class MessageFindInboxSettingResolver {
  constructor(private readonly handler: MessageFindInboxSettingHandler) {}

  @Query('messageFindInboxSetting')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<MessageInboxSetting> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
