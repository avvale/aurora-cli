import { WhatsappMessageMapper, WhatsappMessageResponse, WhatsappRawSQLMessagesQuery } from '@app/whatsapp/message';
import { WhatsappRawSQLMessagesService } from '@app/whatsapp/message/application/raw-sql/whatsapp-raw-sql-messages.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappRawSQLMessagesQuery)
export class WhatsappRawSQLMessagesQueryHandler implements IQueryHandler<WhatsappRawSQLMessagesQuery>
{
    private readonly mapper: WhatsappMessageMapper = new WhatsappMessageMapper();

    constructor(
        private readonly rawSQLMessagesService: WhatsappRawSQLMessagesService,
    ) {}

    async execute(query: WhatsappRawSQLMessagesQuery): Promise<WhatsappMessageResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLMessagesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
