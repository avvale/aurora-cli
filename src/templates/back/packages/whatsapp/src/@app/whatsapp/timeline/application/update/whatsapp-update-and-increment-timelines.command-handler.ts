/* eslint-disable key-spacing */
import { WhatsappUpdateAndIncrementTimelinesCommand } from '@app/whatsapp/timeline';
import { WhatsappUpdateAndIncrementTimelinesService } from '@app/whatsapp/timeline/application/update/whatsapp-update-and-increment-timelines.service';
import {
    WhatsappTimelineAccounts,
    WhatsappTimelineId,
    WhatsappTimelineWabaContactId,
    WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateAndIncrementTimelinesCommand)
export class WhatsappUpdateAndIncrementTimelinesCommandHandler implements ICommandHandler<WhatsappUpdateAndIncrementTimelinesCommand>
{
    constructor(
        private readonly updateTimelinesService: WhatsappUpdateAndIncrementTimelinesService,
    ) {}

    async execute(command: WhatsappUpdateAndIncrementTimelinesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTimelinesService.main(
            {
                id: new WhatsappTimelineId(command.payload.id, { undefinable: true }),
                accounts: new WhatsappTimelineAccounts(command.payload.accounts),
                wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(command.payload.wabaPhoneNumberId, { undefinable: true }),
                wabaContactId: new WhatsappTimelineWabaContactId(command.payload.wabaContactId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
