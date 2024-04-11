import { MessageInboxSetting } from '@api/graphql';
import { MessageInboxSettingDto } from '@api/message/inbox-setting';
import { MessageFindInboxSettingByIdQuery } from '@app/message/inbox-setting';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindInboxSettingByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<MessageInboxSetting | MessageInboxSettingDto>
    {
        return await this.queryBus.ask(new MessageFindInboxSettingByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
