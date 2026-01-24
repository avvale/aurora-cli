import { MessageInboxSetting } from '@api/graphql';
import { MessageFindInboxSettingByIdHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.get')
export class MessageFindInboxSettingByIdResolver {
  constructor(private readonly handler: MessageFindInboxSettingByIdHandler) {}

  @Query('messageFindInboxSettingById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<MessageInboxSetting> {
    return await this.handler.main(id, constraint, timezone);
  }
}
