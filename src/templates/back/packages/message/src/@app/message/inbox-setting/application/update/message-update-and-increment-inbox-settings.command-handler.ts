/* eslint-disable key-spacing */
import { MessageUpdateAndIncrementInboxSettingsCommand } from '@app/message/inbox-setting';
import { MessageUpdateAndIncrementInboxSettingsService } from '@app/message/inbox-setting/application/update/message-update-and-increment-inbox-settings.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpdateAndIncrementInboxSettingsCommand)
export class MessageUpdateAndIncrementInboxSettingsCommandHandler implements ICommandHandler<MessageUpdateAndIncrementInboxSettingsCommand>
{
    constructor(
        private readonly updateInboxSettingsService: MessageUpdateAndIncrementInboxSettingsService,
    ) {}

    async execute(command: MessageUpdateAndIncrementInboxSettingsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateInboxSettingsService.main(
            {
                id: new MessageInboxSettingId(command.payload.id, { undefinable: true }),
                accountId: new MessageInboxSettingAccountId(command.payload.accountId, { undefinable: true }),
                sort: new MessageInboxSettingSort(command.payload.sort, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
