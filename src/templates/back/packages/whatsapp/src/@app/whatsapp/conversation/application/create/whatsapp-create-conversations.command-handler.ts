/* eslint-disable key-spacing */
import { WhatsappCreateConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationsService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversations.service';
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

@CommandHandler(WhatsappCreateConversationsCommand)
export class WhatsappCreateConversationsCommandHandler
  implements ICommandHandler<WhatsappCreateConversationsCommand>
{
  constructor(
    private readonly createConversationsService: WhatsappCreateConversationsService,
  ) {}

  async execute(command: WhatsappCreateConversationsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createConversationsService.main(
      command.payload.map((conversation) => {
        return {
          id: new WhatsappConversationId(conversation.id),
          wabaConversationId: new WhatsappConversationWabaConversationId(
            conversation.wabaConversationId,
          ),
          timelineId: new WhatsappConversationTimelineId(
            conversation.timelineId,
          ),
          wabaContactId: new WhatsappConversationWabaContactId(
            conversation.wabaContactId,
          ),
          expiration: new WhatsappConversationExpiration(
            conversation.expiration,
          ),
          category: new WhatsappConversationCategory(conversation.category),
          isBillable: new WhatsappConversationIsBillable(
            conversation.isBillable,
          ),
          pricingModel: new WhatsappConversationPricingModel(
            conversation.pricingModel,
          ),
        };
      }),
      command.cQMetadata,
    );
  }
}
