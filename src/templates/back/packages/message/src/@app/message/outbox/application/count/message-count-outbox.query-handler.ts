import { MessageCountOutboxQuery } from '@app/message/outbox';
import { MessageCountOutboxService } from '@app/message/outbox/application/count/message-count-outbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageCountOutboxQuery)
export class MessageCountOutboxQueryHandler implements IQueryHandler<MessageCountOutboxQuery>
{
    constructor(
        private readonly countOutboxService: MessageCountOutboxService,
    ) {}

    async execute(query: MessageCountOutboxQuery): Promise<number>
    {
        return await this.countOutboxService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
