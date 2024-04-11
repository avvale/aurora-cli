import { MessageInboxSetting } from '@api/graphql';
import { MessageInboxSettingDto } from '@api/message/inbox-setting';
import { MessageDeleteInboxSettingsCommand, MessageGetInboxSettingsQuery } from '@app/message/inbox-setting';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteInboxSettingsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting[] | MessageInboxSettingDto[]>
    {
        const inboxSettings = await this.queryBus.ask(new MessageGetInboxSettingsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new MessageDeleteInboxSettingsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return inboxSettings;
    }
}
