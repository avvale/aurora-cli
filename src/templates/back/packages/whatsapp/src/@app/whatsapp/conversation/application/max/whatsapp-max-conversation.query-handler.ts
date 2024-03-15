import { WhatsappMaxConversationQuery } from '@app/whatsapp/conversation';
import { WhatsappMaxConversationService } from '@app/whatsapp/conversation/application/max/whatsapp-max-conversation.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappMaxConversationQuery)
export class WhatsappMaxConversationQueryHandler implements IQueryHandler<WhatsappMaxConversationQuery>
{
    constructor(
        private readonly maxConversationService: WhatsappMaxConversationService,
    ) {}

    async execute(query: WhatsappMaxConversationQuery): Promise<number>
    {
        return await this.maxConversationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
