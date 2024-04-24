/* eslint-disable key-spacing */
import { WhatsappUpdateTimelineByIdCommand } from '@app/whatsapp/timeline';
import { WhatsappUpdateTimelineByIdService } from '@app/whatsapp/timeline/application/update/whatsapp-update-timeline-by-id.service';
import {
    WhatsappTimelineAccounts,
    WhatsappTimelineId,
    WhatsappTimelineWabaContactId,
    WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateTimelineByIdCommand)
export class WhatsappUpdateTimelineByIdCommandHandler implements ICommandHandler<WhatsappUpdateTimelineByIdCommand>
{
    constructor(
        private readonly updateTimelineByIdService: WhatsappUpdateTimelineByIdService,
    ) {}

    async execute(command: WhatsappUpdateTimelineByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTimelineByIdService.main(
            {
                id: new WhatsappTimelineId(command.payload.id),
                accounts: new WhatsappTimelineAccounts(command.payload.accounts),
                wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(command.payload.wabaPhoneNumberId, { undefinable: true }),
                wabaContactId: new WhatsappTimelineWabaContactId(command.payload.wabaContactId, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
