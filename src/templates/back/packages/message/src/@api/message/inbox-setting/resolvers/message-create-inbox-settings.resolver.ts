import { MessageCreateInboxSettingInput } from '@api/graphql';
import { MessageCreateInboxSettingsHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.create')
export class MessageCreateInboxSettingsResolver
{
    constructor(
        private readonly handler: MessageCreateInboxSettingsHandler,
    ) {}

    @Mutation('messageCreateInboxSettings')
    async main(
        @Args('payload') payload: MessageCreateInboxSettingInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
