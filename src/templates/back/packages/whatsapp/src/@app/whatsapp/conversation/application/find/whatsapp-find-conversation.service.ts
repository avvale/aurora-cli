import { WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindConversationService
{
    constructor(
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<WhatsappConversation>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
