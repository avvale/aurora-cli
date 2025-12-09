/* eslint-disable key-spacing */
import { MessageUpdateInboxSettingsCommand } from '@app/message/inbox-setting';
import { MessageUpdateInboxSettingsService } from '@app/message/inbox-setting/application/update/message-update-inbox-settings.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingLastReadMessageRowId,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpdateInboxSettingsCommand)
export class MessageUpdateInboxSettingsCommandHandler
    implements ICommandHandler<MessageUpdateInboxSettingsCommand>
{
    constructor(
        private readonly updateInboxSettingsService: MessageUpdateInboxSettingsService,
    ) {}

    async execute(command: MessageUpdateInboxSettingsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateInboxSettingsService.main(
            {
                id: new MessageInboxSettingId(command.payload.id, {
                    undefinable: true,
                }),
                accountId: new MessageInboxSettingAccountId(
                    command.payload.accountId,
                    { undefinable: true },
                ),
                lastReadMessageRowId:
                    new MessageInboxSettingLastReadMessageRowId(
                        command.payload.lastReadMessageRowId,
                        { undefinable: true },
                    ),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
