import {
  MessageIInboxSettingRepository,
  MessageInboxSetting,
} from '@app/message/inbox-setting';
import {
  MessageInboxSettingAccountId,
  MessageInboxSettingCreatedAt,
  MessageInboxSettingId,
  MessageInboxSettingLastReadMessageRowId,
  MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateInboxSettingService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: MessageIInboxSettingRepository,
  ) {}

  async main(
    payload: {
      id: MessageInboxSettingId;
      accountId: MessageInboxSettingAccountId;
      lastReadMessageRowId: MessageInboxSettingLastReadMessageRowId;
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const inboxSetting = MessageInboxSetting.register(
      payload.id,
      undefined, // rowId
      payload.accountId,
      payload.lastReadMessageRowId,
      new MessageInboxSettingCreatedAt({ currentTimestamp: true }),
      new MessageInboxSettingUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(inboxSetting, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const inboxSettingRegister =
      this.publisher.mergeObjectContext(inboxSetting);

    inboxSettingRegister.created({
      payload: inboxSetting,
      cQMetadata,
    }); // apply event to model events
    inboxSettingRegister.commit(); // commit all events of model
  }
}
