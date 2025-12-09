import { MessageCountInboxQuery } from '@app/message/inbox';
import { MessageCountInboxService } from '@app/message/inbox/application/count/message-count-inbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageCountInboxQuery)
export class MessageCountInboxQueryHandler
    implements IQueryHandler<MessageCountInboxQuery>
{
    constructor(private readonly countInboxService: MessageCountInboxService) {}

    async execute(query: MessageCountInboxQuery): Promise<number> {
        return await this.countInboxService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
