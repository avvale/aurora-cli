import {
  MessageInboxSetting,
  messageMockInboxSettingData,
} from '@app/message/inbox-setting';
import {
  MessageInboxSettingAccountId,
  MessageInboxSettingCreatedAt,
  MessageInboxSettingDeletedAt,
  MessageInboxSettingId,
  MessageInboxSettingLastReadMessageRowId,
  MessageInboxSettingRowId,
  MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class MessageMockInboxSettingSeeder extends MockSeeder<MessageInboxSetting> {
  public collectionSource: MessageInboxSetting[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const inboxSetting of _.orderBy(messageMockInboxSettingData, ['id'])) {
      this.collectionSource.push(
        MessageInboxSetting.register(
          new MessageInboxSettingId(inboxSetting.id),
          new MessageInboxSettingRowId(inboxSetting.rowId),
          new MessageInboxSettingAccountId(inboxSetting.accountId),
          new MessageInboxSettingLastReadMessageRowId(
            inboxSetting.lastReadMessageRowId,
          ),
          new MessageInboxSettingCreatedAt({
            currentTimestamp: true,
          }),
          new MessageInboxSettingUpdatedAt({
            currentTimestamp: true,
          }),
          new MessageInboxSettingDeletedAt(null),
        ),
      );
    }
  }
}
