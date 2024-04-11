import { MessageMaxMessageQuery } from '@app/message/message';
import { MessageMaxMessageService } from '@app/message/message/application/max/message-max-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMaxMessageQuery)
export class MessageMaxMessageQueryHandler implements IQueryHandler<MessageMaxMessageQuery>
{
    constructor(
        private readonly maxMessageService: MessageMaxMessageService,
    ) {}

    async execute(query: MessageMaxMessageQuery): Promise<number>
    {
        return await this.maxMessageService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
