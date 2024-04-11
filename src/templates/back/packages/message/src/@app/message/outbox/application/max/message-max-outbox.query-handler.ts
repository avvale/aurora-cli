import { MessageMaxOutboxQuery } from '@app/message/outbox';
import { MessageMaxOutboxService } from '@app/message/outbox/application/max/message-max-outbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMaxOutboxQuery)
export class MessageMaxOutboxQueryHandler implements IQueryHandler<MessageMaxOutboxQuery>
{
    constructor(
        private readonly maxOutboxService: MessageMaxOutboxService,
    ) {}

    async execute(query: MessageMaxOutboxQuery): Promise<number>
    {
        return await this.maxOutboxService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
