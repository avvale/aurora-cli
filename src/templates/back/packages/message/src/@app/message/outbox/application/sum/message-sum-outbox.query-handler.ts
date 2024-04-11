import { MessageSumOutboxQuery } from '@app/message/outbox';
import { MessageSumOutboxService } from '@app/message/outbox/application/sum/message-sum-outbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageSumOutboxQuery)
export class MessageSumOutboxQueryHandler implements IQueryHandler<MessageSumOutboxQuery>
{
    constructor(
        private readonly sumOutboxService: MessageSumOutboxService,
    ) {}

    async execute(query: MessageSumOutboxQuery): Promise<number>
    {
        return await this.sumOutboxService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
