import {
  WhatsappConversationMapper,
  WhatsappConversationResponse,
  WhatsappFindConversationByIdQuery,
} from '@app/whatsapp/conversation';
import { WhatsappFindConversationByIdService } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation-by-id.service';
import { WhatsappConversationId } from '@app/whatsapp/conversation/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappFindConversationByIdQuery)
export class WhatsappFindConversationByIdQueryHandler
  implements IQueryHandler<WhatsappFindConversationByIdQuery>
{
  private readonly mapper: WhatsappConversationMapper =
    new WhatsappConversationMapper();

  constructor(
    private readonly findConversationByIdService: WhatsappFindConversationByIdService,
  ) {}

  async execute(
    query: WhatsappFindConversationByIdQuery,
  ): Promise<WhatsappConversationResponse> {
    const conversation = await this.findConversationByIdService.main(
      new WhatsappConversationId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(conversation);
  }
}
