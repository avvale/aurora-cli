import { WhatsappDeleteMessagesCommand } from '@app/whatsapp/message';
import { WhatsappDeleteMessagesService } from '@app/whatsapp/message/application/delete/whatsapp-delete-messages.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappDeleteMessagesCommand)
export class WhatsappDeleteMessagesCommandHandler implements ICommandHandler<WhatsappDeleteMessagesCommand>
{
    constructor(
        private readonly deleteMessagesService: WhatsappDeleteMessagesService,
    ) {}

    async execute(command: WhatsappDeleteMessagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMessagesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
