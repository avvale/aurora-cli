import {
    MessageIMessageRepository,
    MessageMessage,
} from '@app/message/message';
import { MessageMessageId } from '@app/message/message/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindMessageByIdService {
    constructor(private readonly repository: MessageIMessageRepository) {}

    async main(
        id: MessageMessageId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<MessageMessage> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
