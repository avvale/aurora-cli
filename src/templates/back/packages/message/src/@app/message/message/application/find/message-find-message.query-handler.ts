import {
    MessageFindMessageQuery,
    MessageMessageMapper,
    MessageMessageResponse,
} from '@app/message/message';
import { MessageFindMessageService } from '@app/message/message/application/find/message-find-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindMessageQuery)
export class MessageFindMessageQueryHandler
    implements IQueryHandler<MessageFindMessageQuery>
{
    private readonly mapper: MessageMessageMapper = new MessageMessageMapper();

    constructor(
        private readonly findMessageService: MessageFindMessageService,
    ) {}

    async execute(
        query: MessageFindMessageQuery,
    ): Promise<MessageMessageResponse> {
        const message = await this.findMessageService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(message);
    }
}
