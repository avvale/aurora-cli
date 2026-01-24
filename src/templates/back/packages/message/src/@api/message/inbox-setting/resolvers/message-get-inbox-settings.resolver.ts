import { MessageInboxSetting } from '@api/graphql';
import { MessageGetInboxSettingsHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.get')
export class MessageGetInboxSettingsResolver {
  constructor(private readonly handler: MessageGetInboxSettingsHandler) {}

  @Query('messageGetInboxSettings')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<MessageInboxSetting[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
