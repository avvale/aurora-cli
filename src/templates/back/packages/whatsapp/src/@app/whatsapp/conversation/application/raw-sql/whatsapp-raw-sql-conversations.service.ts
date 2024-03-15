import { WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappRawSQLConversationsService
{
    constructor(
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<WhatsappConversation[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
