import { MessageMessageMapper, MessageMessageResponse, MessageRawSQLMessagesQuery } from '@app/message/message';
import { MessageRawSQLMessagesService } from '@app/message/message/application/raw-sql/message-raw-sql-messages.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageRawSQLMessagesQuery)
export class MessageRawSQLMessagesQueryHandler implements IQueryHandler<MessageRawSQLMessagesQuery>
{
    private readonly mapper: MessageMessageMapper = new MessageMessageMapper();

    constructor(
        private readonly rawSQLMessagesService: MessageRawSQLMessagesService,
    ) {}

    async execute(query: MessageRawSQLMessagesQuery): Promise<MessageMessageResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLMessagesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
