import {
  MessageFindInboxQuery,
  MessageInboxMapper,
  MessageInboxResponse,
} from '@app/message/inbox';
import { MessageFindInboxService } from '@app/message/inbox/application/find/message-find-inbox.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindInboxQuery)
export class MessageFindInboxQueryHandler
  implements IQueryHandler<MessageFindInboxQuery>
{
  private readonly mapper: MessageInboxMapper = new MessageInboxMapper();

  constructor(private readonly findInboxService: MessageFindInboxService) {}

  async execute(query: MessageFindInboxQuery): Promise<MessageInboxResponse> {
    const inbox = await this.findInboxService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(inbox);
  }
}
