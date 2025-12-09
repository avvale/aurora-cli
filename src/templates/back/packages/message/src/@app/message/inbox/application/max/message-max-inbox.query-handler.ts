import { MessageMaxInboxQuery } from '@app/message/inbox';
import { MessageMaxInboxService } from '@app/message/inbox/application/max/message-max-inbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMaxInboxQuery)
export class MessageMaxInboxQueryHandler
    implements IQueryHandler<MessageMaxInboxQuery>
{
    constructor(private readonly maxInboxService: MessageMaxInboxService) {}

    async execute(query: MessageMaxInboxQuery): Promise<number> {
        return await this.maxInboxService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
