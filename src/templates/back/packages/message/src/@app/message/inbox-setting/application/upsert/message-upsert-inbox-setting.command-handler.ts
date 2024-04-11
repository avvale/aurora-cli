/* eslint-disable key-spacing */
import { MessageUpsertInboxSettingCommand } from '@app/message/inbox-setting';
import { MessageUpsertInboxSettingService } from '@app/message/inbox-setting/application/upsert/message-upsert-inbox-setting.service';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingId,
    MessageInboxSettingSort,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpsertInboxSettingCommand)
export class MessageUpsertInboxSettingCommandHandler implements ICommandHandler<MessageUpsertInboxSettingCommand>
{
    constructor(
        private readonly upsertInboxSettingService: MessageUpsertInboxSettingService,
    ) {}

    async execute(command: MessageUpsertInboxSettingCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertInboxSettingService.main(
            {
                id: new MessageInboxSettingId(command.payload.id),
                accountId: new MessageInboxSettingAccountId(command.payload.accountId),
                sort: new MessageInboxSettingSort(command.payload.sort),
            },
            command.cQMetadata,
        );
    }
}
