/* eslint-disable key-spacing */
import { MessageCreateInboxSettingsCommand } from '@app/message/inbox-setting';
import { MessageCreateInboxSettingsService } from '@app/message/inbox-setting/application/create/message-create-inbox-settings.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageCreateInboxSettingsCommand)
export class MessageCreateInboxSettingsCommandHandler implements ICommandHandler<MessageCreateInboxSettingsCommand>
{
    constructor(
        private readonly createInboxSettingsService: MessageCreateInboxSettingsService,
    ) {}

    async execute(command: MessageCreateInboxSettingsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createInboxSettingsService.main(
            command.payload
                .map(inboxSetting =>
                {
                    return {
                        id: new MessageInboxSettingId(inboxSetting.id),
                        accountId: new MessageInboxSettingAccountId(inboxSetting.accountId),
                        sort: new MessageInboxSettingSort(inboxSetting.sort),
                    };
                }),
            command.cQMetadata,
        );
    }
}
