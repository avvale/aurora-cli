/* eslint-disable key-spacing */
import { WhatsappCreateTimelineCommand } from '@app/whatsapp/timeline';
import { WhatsappCreateTimelineService } from '@app/whatsapp/timeline/application/create/whatsapp-create-timeline.service';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineId,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappCreateTimelineCommand)
export class WhatsappCreateTimelineCommandHandler
  implements ICommandHandler<WhatsappCreateTimelineCommand>
{
  constructor(
    private readonly createTimelineService: WhatsappCreateTimelineService,
  ) {}

  async execute(command: WhatsappCreateTimelineCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createTimelineService.main(
      {
        id: new WhatsappTimelineId(command.payload.id),
        accounts: new WhatsappTimelineAccounts(command.payload.accounts),
        wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(
          command.payload.wabaPhoneNumberId,
        ),
        wabaContactId: new WhatsappTimelineWabaContactId(
          command.payload.wabaContactId,
        ),
      },
      command.cQMetadata,
    );
  }
}
