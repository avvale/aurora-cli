/* eslint-disable key-spacing */
import { WhatsappCreateConversationCommand } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversation.service';
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

@CommandHandler(WhatsappCreateConversationCommand)
export class WhatsappCreateConversationCommandHandler implements ICommandHandler<WhatsappCreateConversationCommand>
{
    constructor(
        private readonly createConversationService: WhatsappCreateConversationService,
    ) {}

    async execute(command: WhatsappCreateConversationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createConversationService.main(
            {
                id: new WhatsappConversationId(command.payload.id),
                wabaConversationId: new WhatsappConversationWabaConversationId(command.payload.wabaConversationId),
                timelineId: new WhatsappConversationTimelineId(command.payload.timelineId),
                wabaContactId: new WhatsappConversationWabaContactId(command.payload.wabaContactId),
                expiration: new WhatsappConversationExpiration(command.payload.expiration),
                category: new WhatsappConversationCategory(command.payload.category),
                isBillable: new WhatsappConversationIsBillable(command.payload.isBillable),
                pricingModel: new WhatsappConversationPricingModel(command.payload.pricingModel),
            },
            command.cQMetadata,
        );
    }
}
