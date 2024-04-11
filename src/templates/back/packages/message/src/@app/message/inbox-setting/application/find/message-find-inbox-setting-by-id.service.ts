import { MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import { MessageInboxSettingId } from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindInboxSettingByIdService
{
    constructor(
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        id: MessageInboxSettingId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<MessageInboxSetting>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
