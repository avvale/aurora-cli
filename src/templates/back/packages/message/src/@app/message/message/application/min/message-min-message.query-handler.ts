import { MessageMinMessageQuery } from '@app/message/message';
import { MessageMinMessageService } from '@app/message/message/application/min/message-min-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMinMessageQuery)
export class MessageMinMessageQueryHandler implements IQueryHandler<MessageMinMessageQuery>
{
    constructor(
        private readonly minMessageService: MessageMinMessageService,
    ) {}

    async execute(query: MessageMinMessageQuery): Promise<number>
    {
        return await this.minMessageService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
