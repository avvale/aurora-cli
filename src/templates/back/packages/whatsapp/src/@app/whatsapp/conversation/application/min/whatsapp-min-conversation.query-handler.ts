import { WhatsappMinConversationQuery } from '@app/whatsapp/conversation';
import { WhatsappMinConversationService } from '@app/whatsapp/conversation/application/min/whatsapp-min-conversation.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappMinConversationQuery)
export class WhatsappMinConversationQueryHandler implements IQueryHandler<WhatsappMinConversationQuery>
{
    constructor(
        private readonly minConversationService: WhatsappMinConversationService,
    ) {}

    async execute(query: WhatsappMinConversationQuery): Promise<number>
    {
        return await this.minConversationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
