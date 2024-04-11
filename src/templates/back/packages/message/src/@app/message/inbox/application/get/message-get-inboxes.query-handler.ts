import { MessageGetInboxesQuery, MessageInboxMapper, MessageInboxResponse } from '@app/message/inbox';
import { MessageGetInboxesService } from '@app/message/inbox/application/get/message-get-inboxes.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageGetInboxesQuery)
export class MessageGetInboxesQueryHandler implements IQueryHandler<MessageGetInboxesQuery>
{
    private readonly mapper: MessageInboxMapper = new MessageInboxMapper();

    constructor(
        private readonly getInboxesService: MessageGetInboxesService,
    ) {}

    async execute(query: MessageGetInboxesQuery): Promise<MessageInboxResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getInboxesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
