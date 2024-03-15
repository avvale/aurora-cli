import { WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappConversationId } from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindConversationByIdService
{
    constructor(
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        id: WhatsappConversationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<WhatsappConversation>
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
