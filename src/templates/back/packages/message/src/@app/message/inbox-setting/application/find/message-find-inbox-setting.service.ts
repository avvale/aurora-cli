import { MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindInboxSettingService
{
    constructor(
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<MessageInboxSetting>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
