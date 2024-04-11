import { MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRawSQLInboxSettingsService
{
    constructor(
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<MessageInboxSetting[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
