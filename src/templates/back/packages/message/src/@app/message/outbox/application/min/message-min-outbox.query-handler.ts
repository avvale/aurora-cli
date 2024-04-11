import { MessageMinOutboxQuery } from '@app/message/outbox';
import { MessageMinOutboxService } from '@app/message/outbox/application/min/message-min-outbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMinOutboxQuery)
export class MessageMinOutboxQueryHandler implements IQueryHandler<MessageMinOutboxQuery>
{
    constructor(
        private readonly minOutboxService: MessageMinOutboxService,
    ) {}

    async execute(query: MessageMinOutboxQuery): Promise<number>
    {
        return await this.minOutboxService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
