/* eslint-disable key-spacing */
import { WhatsappUpdateAndIncrementConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateAndIncrementConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-and-increment-conversations.service';
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

@CommandHandler(WhatsappUpdateAndIncrementConversationsCommand)
export class WhatsappUpdateAndIncrementConversationsCommandHandler implements ICommandHandler<WhatsappUpdateAndIncrementConversationsCommand>
{
    constructor(
        private readonly updateConversationsService: WhatsappUpdateAndIncrementConversationsService,
    ) {}

    async execute(command: WhatsappUpdateAndIncrementConversationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateConversationsService.main(
            {
                id: new WhatsappConversationId(command.payload.id, { undefinable: true }),
                wabaConversationId: new WhatsappConversationWabaConversationId(command.payload.wabaConversationId, { undefinable: true }),
                timelineId: new WhatsappConversationTimelineId(command.payload.timelineId, { undefinable: true }),
                wabaContactId: new WhatsappConversationWabaContactId(command.payload.wabaContactId, { undefinable: true }),
                expiration: new WhatsappConversationExpiration(command.payload.expiration, { undefinable: true }),
                category: new WhatsappConversationCategory(command.payload.category, { undefinable: true }),
                isBillable: new WhatsappConversationIsBillable(command.payload.isBillable, { undefinable: true }),
                pricingModel: new WhatsappConversationPricingModel(command.payload.pricingModel, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
