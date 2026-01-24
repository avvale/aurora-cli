import { WhatsappDeleteTimelineByIdCommand } from '@app/whatsapp/timeline';
import { WhatsappDeleteTimelineByIdService } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timeline-by-id.service';
import { WhatsappTimelineId } from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappDeleteTimelineByIdCommand)
export class WhatsappDeleteTimelineByIdCommandHandler
  implements ICommandHandler<WhatsappDeleteTimelineByIdCommand>
{
  constructor(
    private readonly deleteTimelineByIdService: WhatsappDeleteTimelineByIdService,
  ) {}

  async execute(command: WhatsappDeleteTimelineByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteTimelineByIdService.main(
      new WhatsappTimelineId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
