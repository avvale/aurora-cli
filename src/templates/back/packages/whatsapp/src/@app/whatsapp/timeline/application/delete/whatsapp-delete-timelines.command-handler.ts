import { WhatsappDeleteTimelinesCommand } from '@app/whatsapp/timeline';
import { WhatsappDeleteTimelinesService } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timelines.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappDeleteTimelinesCommand)
export class WhatsappDeleteTimelinesCommandHandler implements ICommandHandler<WhatsappDeleteTimelinesCommand>
{
    constructor(
        private readonly deleteTimelinesService: WhatsappDeleteTimelinesService,
    ) {}

    async execute(command: WhatsappDeleteTimelinesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTimelinesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
