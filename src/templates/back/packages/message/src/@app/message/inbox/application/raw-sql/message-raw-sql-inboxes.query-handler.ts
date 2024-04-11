import { MessageInboxMapper, MessageInboxResponse, MessageRawSQLInboxesQuery } from '@app/message/inbox';
import { MessageRawSQLInboxesService } from '@app/message/inbox/application/raw-sql/message-raw-sql-inboxes.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageRawSQLInboxesQuery)
export class MessageRawSQLInboxesQueryHandler implements IQueryHandler<MessageRawSQLInboxesQuery>
{
    private readonly mapper: MessageInboxMapper = new MessageInboxMapper();

    constructor(
        private readonly rawSQLInboxesService: MessageRawSQLInboxesService,
    ) {}

    async execute(query: MessageRawSQLInboxesQuery): Promise<MessageInboxResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLInboxesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
