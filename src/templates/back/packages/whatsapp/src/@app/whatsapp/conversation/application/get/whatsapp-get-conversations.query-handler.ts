import { WhatsappConversationMapper, WhatsappConversationResponse, WhatsappGetConversationsQuery } from '@app/whatsapp/conversation';
import { WhatsappGetConversationsService } from '@app/whatsapp/conversation/application/get/whatsapp-get-conversations.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappGetConversationsQuery)
export class WhatsappGetConversationsQueryHandler implements IQueryHandler<WhatsappGetConversationsQuery>
{
    private readonly mapper: WhatsappConversationMapper = new WhatsappConversationMapper();

    constructor(
        private readonly getConversationsService: WhatsappGetConversationsService,
    ) {}

    async execute(query: WhatsappGetConversationsQuery): Promise<WhatsappConversationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getConversationsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
