/* eslint-disable key-spacing */
import { WhatsappCreateTimelinesCommand } from '@app/whatsapp/timeline';
import { WhatsappCreateTimelinesService } from '@app/whatsapp/timeline/application/create/whatsapp-create-timelines.service';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineId,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappCreateTimelinesCommand)
export class WhatsappCreateTimelinesCommandHandler
  implements ICommandHandler<WhatsappCreateTimelinesCommand>
{
  constructor(
    private readonly createTimelinesService: WhatsappCreateTimelinesService,
  ) {}

  async execute(command: WhatsappCreateTimelinesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createTimelinesService.main(
      command.payload.map((timeline) => {
        return {
          id: new WhatsappTimelineId(timeline.id),
          accounts: new WhatsappTimelineAccounts(timeline.accounts),
          wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(
            timeline.wabaPhoneNumberId,
          ),
          wabaContactId: new WhatsappTimelineWabaContactId(
            timeline.wabaContactId,
          ),
        };
      }),
      command.cQMetadata,
    );
  }
}
