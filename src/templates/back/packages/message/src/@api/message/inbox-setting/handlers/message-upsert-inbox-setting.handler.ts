import { MessageInboxSetting, MessageUpdateInboxSettingByIdInput } from '@api/graphql';
import { MessageInboxSettingDto, MessageUpdateInboxSettingByIdDto } from '@api/message/inbox-setting';
import { MessageFindInboxSettingByIdQuery, MessageUpsertInboxSettingCommand } from '@app/message/inbox-setting';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpsertInboxSettingHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: MessageUpdateInboxSettingByIdInput | MessageUpdateInboxSettingByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting | MessageInboxSettingDto>
    {
        await this.commandBus.dispatch(new MessageUpsertInboxSettingCommand(
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
