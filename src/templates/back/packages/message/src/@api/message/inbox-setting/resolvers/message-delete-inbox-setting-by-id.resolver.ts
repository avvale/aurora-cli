import { MessageInboxSetting } from '@api/graphql';
import { MessageDeleteInboxSettingByIdHandler } from '@api/message/inbox-setting';
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
export class MessageDeleteInboxSettingByIdResolver {
    constructor(
        private readonly handler: MessageDeleteInboxSettingByIdHandler,
    ) {}

    @Mutation('messageDeleteInboxSettingById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
