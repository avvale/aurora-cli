import { MessageFindInboxByIdQuery, MessageInboxMapper, MessageInboxResponse } from '@app/message/inbox';
import { MessageFindInboxByIdService } from '@app/message/inbox/application/find/message-find-inbox-by-id.service';
import { MessageInboxId } from '@app/message/inbox/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindInboxByIdQuery)
export class MessageFindInboxByIdQueryHandler implements IQueryHandler<MessageFindInboxByIdQuery>
{
    private readonly mapper: MessageInboxMapper = new MessageInboxMapper();

    constructor(
        private readonly findInboxByIdService: MessageFindInboxByIdService,
    ) {}

    async execute(query: MessageFindInboxByIdQuery): Promise<MessageInboxResponse>
    {
        const inbox = await this.findInboxByIdService.main(
            new MessageInboxId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(inbox);
    }
}
