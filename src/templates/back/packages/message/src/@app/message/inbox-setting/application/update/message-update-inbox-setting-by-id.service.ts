import {
  MessageIInboxSettingRepository,
  MessageInboxSetting,
} from '@app/message/inbox-setting';
import {
  MessageInboxSettingAccountId,
  MessageInboxSettingId,
  MessageInboxSettingLastReadMessageRowId,
  MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateInboxSettingByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: MessageIInboxSettingRepository,
  ) {}

  async main(
    payload: {
      id: MessageInboxSettingId;
      accountId?: MessageInboxSettingAccountId;
      lastReadMessageRowId?: MessageInboxSettingLastReadMessageRowId;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const inboxSetting = MessageInboxSetting.register(
      payload.id,
      undefined, // rowId
      payload.accountId,
      payload.lastReadMessageRowId,
      null, // createdAt
      new MessageInboxSettingUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update by id
    await this.repository.updateById(inboxSetting, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const inboxSettingRegister =
      this.publisher.mergeObjectContext(inboxSetting);

    inboxSettingRegister.updated({
      payload: inboxSetting,
      cQMetadata,
    }); // apply event to model events
    inboxSettingRegister.commit(); // commit all events of model
  }
}
