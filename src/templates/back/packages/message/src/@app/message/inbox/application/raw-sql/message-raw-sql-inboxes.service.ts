import { MessageIInboxRepository, MessageInbox } from '@app/message/inbox';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRawSQLInboxesService
{
    constructor(
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<MessageInbox[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
