import { MessageCreateInboxSettingInput, MessageInboxSetting } from '@api/graphql';
import { MessageCreateInboxSettingDto, MessageInboxSettingDto } from '@api/message/inbox-setting';
import { MessageCreateInboxSettingCommand, MessageFindInboxSettingByIdQuery } from '@app/message/inbox-setting';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateInboxSettingHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: MessageCreateInboxSettingInput | MessageCreateInboxSettingDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting | MessageInboxSettingDto>
    {
        await this.commandBus.dispatch(new MessageCreateInboxSettingCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageFindInboxSettingByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
