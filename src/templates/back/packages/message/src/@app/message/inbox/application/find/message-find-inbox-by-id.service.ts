import { MessageIInboxRepository, MessageInbox } from '@app/message/inbox';
import { MessageInboxId } from '@app/message/inbox/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindInboxByIdService
{
    constructor(
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        id: MessageInboxId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<MessageInbox>
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
