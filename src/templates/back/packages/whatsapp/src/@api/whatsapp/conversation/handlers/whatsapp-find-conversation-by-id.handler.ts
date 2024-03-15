import { WhatsappConversation } from '@api/graphql';
import { WhatsappConversationDto } from '@api/whatsapp/conversation';
import { WhatsappFindConversationByIdQuery } from '@app/whatsapp/conversation';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindConversationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappConversation | WhatsappConversationDto>
    {
        return await this.queryBus.ask(new WhatsappFindConversationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
