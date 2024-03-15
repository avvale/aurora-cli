import { WhatsappConversationMapper, WhatsappConversationResponse, WhatsappFindConversationQuery } from '@app/whatsapp/conversation';
import { WhatsappFindConversationService } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappFindConversationQuery)
export class WhatsappFindConversationQueryHandler implements IQueryHandler<WhatsappFindConversationQuery>
{
    private readonly mapper: WhatsappConversationMapper = new WhatsappConversationMapper();

    constructor(
        private readonly findConversationService: WhatsappFindConversationService,
    ) {}

    async execute(query: WhatsappFindConversationQuery): Promise<WhatsappConversationResponse>
    {
        const conversation = await this.findConversationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(conversation);
    }
}
