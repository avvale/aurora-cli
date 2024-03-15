import { WhatsappSumConversationQuery } from '@app/whatsapp/conversation';
import { WhatsappSumConversationService } from '@app/whatsapp/conversation/application/sum/whatsapp-sum-conversation.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappSumConversationQuery)
export class WhatsappSumConversationQueryHandler implements IQueryHandler<WhatsappSumConversationQuery>
{
    constructor(
        private readonly sumConversationService: WhatsappSumConversationService,
    ) {}

    async execute(query: WhatsappSumConversationQuery): Promise<number>
    {
        return await this.sumConversationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
