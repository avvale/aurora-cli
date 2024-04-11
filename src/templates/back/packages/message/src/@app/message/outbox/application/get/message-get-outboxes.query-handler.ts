import { MessageGetOutboxesQuery, MessageOutboxMapper, MessageOutboxResponse } from '@app/message/outbox';
import { MessageGetOutboxesService } from '@app/message/outbox/application/get/message-get-outboxes.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageGetOutboxesQuery)
export class MessageGetOutboxesQueryHandler implements IQueryHandler<MessageGetOutboxesQuery>
{
    private readonly mapper: MessageOutboxMapper = new MessageOutboxMapper();

    constructor(
        private readonly getOutboxesService: MessageGetOutboxesService,
    ) {}

    async execute(query: MessageGetOutboxesQuery): Promise<MessageOutboxResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getOutboxesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
