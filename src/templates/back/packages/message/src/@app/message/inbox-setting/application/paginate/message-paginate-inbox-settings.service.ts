import { MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagePaginateInboxSettingsService
{
    constructor(
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<MessageInboxSetting>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
