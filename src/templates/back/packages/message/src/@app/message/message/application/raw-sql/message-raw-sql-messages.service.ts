import { MessageIMessageRepository, MessageMessage } from '@app/message/message';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRawSQLMessagesService
{
    constructor(
        private readonly repository: MessageIMessageRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<MessageMessage[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
