import { MessageInboxSetting, MessageUpdateInboxSettingByIdInput } from '@api/graphql';
import { MessageUpdateInboxSettingByIdHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.update')
export class MessageUpdateInboxSettingByIdResolver
{
    constructor(
        private readonly handler: MessageUpdateInboxSettingByIdHandler,
    ) {}

    @Mutation('messageUpdateInboxSettingById')
    async main(
        @Args('payload') payload: MessageUpdateInboxSettingByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
