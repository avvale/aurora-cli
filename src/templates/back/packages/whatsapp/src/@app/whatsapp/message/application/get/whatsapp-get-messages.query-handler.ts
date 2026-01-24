import {
  WhatsappGetMessagesQuery,
  WhatsappMessageMapper,
  WhatsappMessageResponse,
} from '@app/whatsapp/message';
import { WhatsappGetMessagesService } from '@app/whatsapp/message/application/get/whatsapp-get-messages.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappGetMessagesQuery)
export class WhatsappGetMessagesQueryHandler
  implements IQueryHandler<WhatsappGetMessagesQuery>
{
  private readonly mapper: WhatsappMessageMapper = new WhatsappMessageMapper();

  constructor(
    private readonly getMessagesService: WhatsappGetMessagesService,
  ) {}

  async execute(
    query: WhatsappGetMessagesQuery,
  ): Promise<WhatsappMessageResponse[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.getMessagesService.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      ),
    );
  }
}
