import { MessageSumMessageQuery } from '@app/message/message';
import { MessageSumMessageService } from '@app/message/message/application/sum/message-sum-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageSumMessageQuery)
export class MessageSumMessageQueryHandler implements IQueryHandler<MessageSumMessageQuery>
{
    constructor(
        private readonly sumMessageService: MessageSumMessageService,
    ) {}

    async execute(query: MessageSumMessageQuery): Promise<number>
    {
        return await this.sumMessageService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
