/* eslint-disable key-spacing */
import { WhatsappUpdateConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversations.service';
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

@CommandHandler(WhatsappUpdateConversationsCommand)
export class WhatsappUpdateConversationsCommandHandler
  implements ICommandHandler<WhatsappUpdateConversationsCommand>
{
  constructor(
    private readonly updateConversationsService: WhatsappUpdateConversationsService,
  ) {}

  async execute(command: WhatsappUpdateConversationsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateConversationsService.main(
      {
        id: new WhatsappConversationId(command.payload.id, {
          undefinable: true,
        }),
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
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
