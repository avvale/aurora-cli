import {
    MessageFindOutboxByIdQuery,
    MessageOutboxMapper,
    MessageOutboxResponse,
} from '@app/message/outbox';
import { MessageFindOutboxByIdService } from '@app/message/outbox/application/find/message-find-outbox-by-id.service';
import { MessageOutboxId } from '@app/message/outbox/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindOutboxByIdQuery)
export class MessageFindOutboxByIdQueryHandler
    implements IQueryHandler<MessageFindOutboxByIdQuery>
{
    private readonly mapper: MessageOutboxMapper = new MessageOutboxMapper();

    constructor(
        private readonly findOutboxByIdService: MessageFindOutboxByIdService,
    ) {}

    async execute(
        query: MessageFindOutboxByIdQuery,
    ): Promise<MessageOutboxResponse> {
        const outbox = await this.findOutboxByIdService.main(
            new MessageOutboxId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(outbox);
    }
}
