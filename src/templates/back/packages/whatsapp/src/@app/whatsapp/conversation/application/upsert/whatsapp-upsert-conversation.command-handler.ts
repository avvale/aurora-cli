/* eslint-disable key-spacing */
import { WhatsappUpsertConversationCommand } from '@app/whatsapp/conversation';
import { WhatsappUpsertConversationService } from '@app/whatsapp/conversation/application/upsert/whatsapp-upsert-conversation.service';
import {
  WhatsappConversationCategory,
  WhatsappConversationExpiration,
  WhatsappConversationId,
  WhatsappConversationIsBillable,
  WhatsappConversationPricingModel,
  WhatsappConversationTimelineId,
  WhatsappConversationWabaContactId,
  WhatsappConversationWabaConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpsertConversationCommand)
export class WhatsappUpsertConversationCommandHandler
  implements ICommandHandler<WhatsappUpsertConversationCommand>
{
  constructor(
    private readonly upsertConversationService: WhatsappUpsertConversationService,
  ) {}

  async execute(command: WhatsappUpsertConversationCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.upsertConversationService.main(
      {
        id: new WhatsappConversationId(command.payload.id),
        wabaConversationId: new WhatsappConversationWabaConversationId(
          command.payload.wabaConversationId,
        ),
        timelineId: new WhatsappConversationTimelineId(
          command.payload.timelineId,
        ),
        wabaContactId: new WhatsappConversationWabaContactId(
          command.payload.wabaContactId,
        ),
        expiration: new WhatsappConversationExpiration(
          command.payload.expiration,
        ),
        category: new WhatsappConversationCategory(command.payload.category),
        isBillable: new WhatsappConversationIsBillable(
          command.payload.isBillable,
        ),
        pricingModel: new WhatsappConversationPricingModel(
          command.payload.pricingModel,
        ),
      },
      command.cQMetadata,
    );
  }
}
