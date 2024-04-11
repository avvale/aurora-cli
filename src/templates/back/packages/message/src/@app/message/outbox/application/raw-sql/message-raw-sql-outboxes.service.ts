import { MessageIOutboxRepository, MessageOutbox } from '@app/message/outbox';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRawSQLOutboxesService
{
    constructor(
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<MessageOutbox[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
