import {
    MessageFindOutboxQuery,
    MessageOutboxMapper,
    MessageOutboxResponse,
} from '@app/message/outbox';
import { MessageFindOutboxService } from '@app/message/outbox/application/find/message-find-outbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindOutboxQuery)
export class MessageFindOutboxQueryHandler
    implements IQueryHandler<MessageFindOutboxQuery>
{
    private readonly mapper: MessageOutboxMapper = new MessageOutboxMapper();

    constructor(private readonly findOutboxService: MessageFindOutboxService) {}

    async execute(
        query: MessageFindOutboxQuery,
    ): Promise<MessageOutboxResponse> {
        const outbox = await this.findOutboxService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(outbox);
    }
}
