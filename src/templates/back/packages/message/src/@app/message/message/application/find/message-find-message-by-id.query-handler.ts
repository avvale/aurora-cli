import { MessageFindMessageByIdQuery, MessageMessageMapper, MessageMessageResponse } from '@app/message/message';
import { MessageFindMessageByIdService } from '@app/message/message/application/find/message-find-message-by-id.service';
import { MessageMessageId } from '@app/message/message/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindMessageByIdQuery)
export class MessageFindMessageByIdQueryHandler implements IQueryHandler<MessageFindMessageByIdQuery>
{
    private readonly mapper: MessageMessageMapper = new MessageMessageMapper();

    constructor(
        private readonly findMessageByIdService: MessageFindMessageByIdService,
    ) {}

    async execute(query: MessageFindMessageByIdQuery): Promise<MessageMessageResponse>
    {
        const message = await this.findMessageByIdService.main(
            new MessageMessageId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(message);
    }
}
