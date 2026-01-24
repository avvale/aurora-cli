/* eslint-disable key-spacing */
import { WhatsappUpdateTimelinesCommand } from '@app/whatsapp/timeline';
import { WhatsappUpdateTimelinesService } from '@app/whatsapp/timeline/application/update/whatsapp-update-timelines.service';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineId,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateTimelinesCommand)
export class WhatsappUpdateTimelinesCommandHandler
  implements ICommandHandler<WhatsappUpdateTimelinesCommand>
{
  constructor(
    private readonly updateTimelinesService: WhatsappUpdateTimelinesService,
  ) {}

  async execute(command: WhatsappUpdateTimelinesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateTimelinesService.main(
      {
        id: new WhatsappTimelineId(command.payload.id, { undefinable: true }),
        accounts: new WhatsappTimelineAccounts(command.payload.accounts),
        wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(
          command.payload.wabaPhoneNumberId,
          { undefinable: true },
        ),
        wabaContactId: new WhatsappTimelineWabaContactId(
          command.payload.wabaContactId,
          { undefinable: true },
        ),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
