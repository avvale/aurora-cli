import { WhatsappMaxMessageQuery } from '@app/whatsapp/message';
import { WhatsappMaxMessageService } from '@app/whatsapp/message/application/max/whatsapp-max-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappMaxMessageQuery)
export class WhatsappMaxMessageQueryHandler
  implements IQueryHandler<WhatsappMaxMessageQuery>
{
  constructor(private readonly maxMessageService: WhatsappMaxMessageService) {}

  async execute(query: WhatsappMaxMessageQuery): Promise<number> {
    return await this.maxMessageService.main(
      query.column,
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );
  }
}
