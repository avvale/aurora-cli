import { MessageSumInboxQuery } from '@app/message/inbox';
import { MessageSumInboxService } from '@app/message/inbox/application/sum/message-sum-inbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageSumInboxQuery)
export class MessageSumInboxQueryHandler implements IQueryHandler<MessageSumInboxQuery>
{
    constructor(
        private readonly sumInboxService: MessageSumInboxService,
    ) {}

    async execute(query: MessageSumInboxQuery): Promise<number>
    {
        return await this.sumInboxService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
