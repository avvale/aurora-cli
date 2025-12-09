import { MessageDeleteInboxSettingByIdCommand } from '@app/message/inbox-setting';
import { MessageDeleteInboxSettingByIdService } from '@app/message/inbox-setting/application/delete/message-delete-inbox-setting-by-id.service';
import { MessageInboxSettingId } from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteInboxSettingByIdCommand)
export class MessageDeleteInboxSettingByIdCommandHandler
    implements ICommandHandler<MessageDeleteInboxSettingByIdCommand>
{
    constructor(
        private readonly deleteInboxSettingByIdService: MessageDeleteInboxSettingByIdService,
    ) {}

    async execute(
        command: MessageDeleteInboxSettingByIdCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteInboxSettingByIdService.main(
            new MessageInboxSettingId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
