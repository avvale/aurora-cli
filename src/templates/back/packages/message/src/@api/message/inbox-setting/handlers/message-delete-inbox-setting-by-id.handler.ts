import { MessageInboxSetting } from '@api/graphql';
import { MessageInboxSettingDto } from '@api/message/inbox-setting';
import { MessageDeleteInboxSettingByIdCommand, MessageFindInboxSettingByIdQuery } from '@app/message/inbox-setting';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteInboxSettingByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting | MessageInboxSettingDto>
    {
        const inboxSetting = await this.queryBus.ask(new MessageFindInboxSettingByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new MessageDeleteInboxSettingByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return inboxSetting;
    }
}
