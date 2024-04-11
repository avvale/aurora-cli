import { MessageMinInboxQuery } from '@app/message/inbox';
import { MessageMinInboxService } from '@app/message/inbox/application/min/message-min-inbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMinInboxQuery)
export class MessageMinInboxQueryHandler implements IQueryHandler<MessageMinInboxQuery>
{
    constructor(
        private readonly minInboxService: MessageMinInboxService,
    ) {}

    async execute(query: MessageMinInboxQuery): Promise<number>
    {
        return await this.minInboxService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
