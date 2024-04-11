import { MessageCountMessageQuery } from '@app/message/message';
import { MessageCountMessageService } from '@app/message/message/application/count/message-count-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageCountMessageQuery)
export class MessageCountMessageQueryHandler implements IQueryHandler<MessageCountMessageQuery>
{
    constructor(
        private readonly countMessageService: MessageCountMessageService,
    ) {}

    async execute(query: MessageCountMessageQuery): Promise<number>
    {
        return await this.countMessageService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
