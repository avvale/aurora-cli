import { MessageOutboxMapper, MessageOutboxResponse, MessageRawSQLOutboxesQuery } from '@app/message/outbox';
import { MessageRawSQLOutboxesService } from '@app/message/outbox/application/raw-sql/message-raw-sql-outboxes.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageRawSQLOutboxesQuery)
export class MessageRawSQLOutboxesQueryHandler implements IQueryHandler<MessageRawSQLOutboxesQuery>
{
    private readonly mapper: MessageOutboxMapper = new MessageOutboxMapper();

    constructor(
        private readonly rawSQLOutboxesService: MessageRawSQLOutboxesService,
    ) {}

    async execute(query: MessageRawSQLOutboxesQuery): Promise<MessageOutboxResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLOutboxesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
