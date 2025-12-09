import {
    MessageCreateInboxSettingInput,
    MessageInboxSetting,
} from '@api/graphql';
import { MessageCreateInboxSettingHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.create')
export class MessageCreateInboxSettingResolver {
    constructor(private readonly handler: MessageCreateInboxSettingHandler) {}

    @Mutation('messageCreateInboxSetting')
    async main(
        @Args('payload') payload: MessageCreateInboxSettingInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
