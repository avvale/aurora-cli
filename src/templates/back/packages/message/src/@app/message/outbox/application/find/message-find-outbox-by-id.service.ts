import { MessageIOutboxRepository, MessageOutbox } from '@app/message/outbox';
import { MessageOutboxId } from '@app/message/outbox/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindOutboxByIdService {
    constructor(private readonly repository: MessageIOutboxRepository) {}

    async main(
        id: MessageOutboxId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<MessageOutbox> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
