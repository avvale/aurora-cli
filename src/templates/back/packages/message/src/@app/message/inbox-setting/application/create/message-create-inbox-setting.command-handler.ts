/* eslint-disable key-spacing */
import { MessageCreateInboxSettingCommand } from '@app/message/inbox-setting';
import { MessageCreateInboxSettingService } from '@app/message/inbox-setting/application/create/message-create-inbox-setting.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageCreateInboxSettingCommand)
export class MessageCreateInboxSettingCommandHandler implements ICommandHandler<MessageCreateInboxSettingCommand>
{
    constructor(
        private readonly createInboxSettingService: MessageCreateInboxSettingService,
    ) {}

    async execute(command: MessageCreateInboxSettingCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createInboxSettingService.main(
            {
                id: new MessageInboxSettingId(command.payload.id),
                accountId: new MessageInboxSettingAccountId(command.payload.accountId),
                sort: new MessageInboxSettingSort(command.payload.sort),
            },
            command.cQMetadata,
        );
    }
}
