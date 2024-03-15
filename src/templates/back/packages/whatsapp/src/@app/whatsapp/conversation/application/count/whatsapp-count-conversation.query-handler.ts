import { WhatsappCountConversationQuery } from '@app/whatsapp/conversation';
import { WhatsappCountConversationService } from '@app/whatsapp/conversation/application/count/whatsapp-count-conversation.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappCountConversationQuery)
export class WhatsappCountConversationQueryHandler implements IQueryHandler<WhatsappCountConversationQuery>
{
    constructor(
        private readonly countConversationService: WhatsappCountConversationService,
    ) {}

    async execute(query: WhatsappCountConversationQuery): Promise<number>
    {
        return await this.countConversationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
