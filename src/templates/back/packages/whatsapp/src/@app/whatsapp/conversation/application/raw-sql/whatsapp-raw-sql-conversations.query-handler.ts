import { WhatsappConversationMapper, WhatsappConversationResponse, WhatsappRawSQLConversationsQuery } from '@app/whatsapp/conversation';
import { WhatsappRawSQLConversationsService } from '@app/whatsapp/conversation/application/raw-sql/whatsapp-raw-sql-conversations.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappRawSQLConversationsQuery)
export class WhatsappRawSQLConversationsQueryHandler implements IQueryHandler<WhatsappRawSQLConversationsQuery>
{
    private readonly mapper: WhatsappConversationMapper = new WhatsappConversationMapper();

    constructor(
        private readonly rawSQLConversationsService: WhatsappRawSQLConversationsService,
    ) {}

    async execute(query: WhatsappRawSQLConversationsQuery): Promise<WhatsappConversationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLConversationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
