/* eslint-disable key-spacing */
import { WhatsappUpsertTimelineCommand } from '@app/whatsapp/timeline';
import { WhatsappUpsertTimelineService } from '@app/whatsapp/timeline/application/upsert/whatsapp-upsert-timeline.service';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineId,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpsertTimelineCommand)
export class WhatsappUpsertTimelineCommandHandler
  implements ICommandHandler<WhatsappUpsertTimelineCommand>
{
  constructor(
    private readonly upsertTimelineService: WhatsappUpsertTimelineService,
  ) {}

  async execute(command: WhatsappUpsertTimelineCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.upsertTimelineService.main(
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
