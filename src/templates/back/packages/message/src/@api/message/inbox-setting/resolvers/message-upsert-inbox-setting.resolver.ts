import { MessageInboxSetting, MessageUpdateInboxSettingByIdInput } from '@api/graphql';
import { MessageUpsertInboxSettingHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.upsert')
export class MessageUpsertInboxSettingResolver
{
    constructor(
        private readonly handler: MessageUpsertInboxSettingHandler,
    ) {}

    @Mutation('messageUpsertInboxSetting')
    async main(
        @Args('payload') payload: MessageUpdateInboxSettingByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
