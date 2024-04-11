import { MessageInboxSetting } from '@api/graphql';
import { MessageInboxSettingDto } from '@api/message/inbox-setting';
import { MessageGetInboxSettingsQuery } from '@app/message/inbox-setting';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageGetInboxSettingsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<MessageInboxSetting[] | MessageInboxSettingDto[]>
    {
        return await this.queryBus.ask(new MessageGetInboxSettingsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
