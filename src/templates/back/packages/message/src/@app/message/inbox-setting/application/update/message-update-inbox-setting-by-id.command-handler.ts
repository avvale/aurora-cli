/* eslint-disable key-spacing */
import { MessageUpdateInboxSettingByIdCommand } from '@app/message/inbox-setting';
import { MessageUpdateInboxSettingByIdService } from '@app/message/inbox-setting/application/update/message-update-inbox-setting-by-id.service';
import {
  MessageInboxSettingAccountId,
  MessageInboxSettingId,
  MessageInboxSettingLastReadMessageRowId,
} from '@app/message/inbox-setting/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpdateInboxSettingByIdCommand)
export class MessageUpdateInboxSettingByIdCommandHandler
  implements ICommandHandler<MessageUpdateInboxSettingByIdCommand>
{
  constructor(
    private readonly updateInboxSettingByIdService: MessageUpdateInboxSettingByIdService,
  ) {}

  async execute(command: MessageUpdateInboxSettingByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateInboxSettingByIdService.main(
      {
        id: new MessageInboxSettingId(command.payload.id),
        accountId: new MessageInboxSettingAccountId(command.payload.accountId, {
          undefinable: true,
        }),
        lastReadMessageRowId: new MessageInboxSettingLastReadMessageRowId(
          command.payload.lastReadMessageRowId,
          { undefinable: true },
        ),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
