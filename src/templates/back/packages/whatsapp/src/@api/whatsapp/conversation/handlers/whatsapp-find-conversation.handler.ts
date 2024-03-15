import { WhatsappConversation } from '@api/graphql';
import { WhatsappConversationDto } from '@api/whatsapp/conversation';
import { WhatsappFindConversationQuery } from '@app/whatsapp/conversation';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindConversationHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappConversation | WhatsappConversationDto>
    {
        return await this.queryBus.ask(new WhatsappFindConversationQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
