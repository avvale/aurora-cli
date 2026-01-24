/* eslint-disable key-spacing */
import { WhatsappUpdateConversationByIdCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationByIdService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversation-by-id.service';
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

@CommandHandler(WhatsappUpdateConversationByIdCommand)
export class WhatsappUpdateConversationByIdCommandHandler
  implements ICommandHandler<WhatsappUpdateConversationByIdCommand>
{
  constructor(
    private readonly updateConversationByIdService: WhatsappUpdateConversationByIdService,
  ) {}

  async execute(command: WhatsappUpdateConversationByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateConversationByIdService.main(
      {
        id: new WhatsappConversationId(command.payload.id),
        wabaConversationId: new WhatsappConversationWabaConversationId(
          command.payload.wabaConversationId,
          { undefinable: true },
        ),
        timelineId: new WhatsappConversationTimelineId(
          command.payload.timelineId,
          { undefinable: true },
        ),
        wabaContactId: new WhatsappConversationWabaContactId(
          command.payload.wabaContactId,
          { undefinable: true },
        ),
        expiration: new WhatsappConversationExpiration(
          command.payload.expiration,
          { undefinable: true },
        ),
        category: new WhatsappConversationCategory(command.payload.category, {
          undefinable: true,
        }),
        isBillable: new WhatsappConversationIsBillable(
          command.payload.isBillable,
          { undefinable: true },
        ),
        pricingModel: new WhatsappConversationPricingModel(
          command.payload.pricingModel,
          { undefinable: true },
        ),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
