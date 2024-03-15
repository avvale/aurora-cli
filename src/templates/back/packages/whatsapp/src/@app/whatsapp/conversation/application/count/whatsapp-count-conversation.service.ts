import { WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappCountConversationService
{
    constructor(
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.count(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
