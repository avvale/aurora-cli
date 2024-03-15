import { WhatsappIMessageRepository, WhatsappMessage } from '@app/whatsapp/message';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindMessageService
{
    constructor(
        private readonly repository: WhatsappIMessageRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<WhatsappMessage>
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
