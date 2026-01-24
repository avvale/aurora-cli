/* eslint-disable key-spacing */
import { WhatsappUpdateMessageByIdCommand } from '@app/whatsapp/message';
import { WhatsappUpdateMessageByIdService } from '@app/whatsapp/message/application/update/whatsapp-update-message-by-id.service';
import {
  WhatsappMessageAccountId,
  WhatsappMessageContactName,
  WhatsappMessageConversationId,
  WhatsappMessageDirection,
  WhatsappMessageId,
  WhatsappMessagePayload,
  WhatsappMessageStatuses,
  WhatsappMessageTimelineId,
  WhatsappMessageType,
  WhatsappMessageWabaContactId,
  WhatsappMessageWabaMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateMessageByIdCommand)
export class WhatsappUpdateMessageByIdCommandHandler
  implements ICommandHandler<WhatsappUpdateMessageByIdCommand>
{
  constructor(
    private readonly updateMessageByIdService: WhatsappUpdateMessageByIdService,
  ) {}

  async execute(command: WhatsappUpdateMessageByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateMessageByIdService.main(
      {
        id: new WhatsappMessageId(command.payload.id),
        wabaMessageId: new WhatsappMessageWabaMessageId(
          command.payload.wabaMessageId,
          { undefinable: true },
        ),
        timelineId: new WhatsappMessageTimelineId(command.payload.timelineId, {
          undefinable: true,
        }),
        conversationId: new WhatsappMessageConversationId(
          command.payload.conversationId,
        ),
        statuses: new WhatsappMessageStatuses(command.payload.statuses, {
          undefinable: true,
        }),
        direction: new WhatsappMessageDirection(command.payload.direction, {
          undefinable: true,
        }),
        accountId: new WhatsappMessageAccountId(command.payload.accountId),
        wabaContactId: new WhatsappMessageWabaContactId(
          command.payload.wabaContactId,
          { undefinable: true },
        ),
        contactName: new WhatsappMessageContactName(
          command.payload.contactName,
        ),
        type: new WhatsappMessageType(command.payload.type, {
          undefinable: true,
        }),
        payload: new WhatsappMessagePayload(command.payload.payload, {
          undefinable: true,
        }),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
