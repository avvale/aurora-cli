import {
  MessageCreatedInboxSettingEvent,
  MessageCreatedInboxSettingsEvent,
  MessageDeletedInboxSettingEvent,
  MessageDeletedInboxSettingsEvent,
  MessageInboxSetting,
  MessageUpdatedInboxSettingEvent,
  MessageUpdatedInboxSettingsEvent,
} from '@app/message/inbox-setting';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddInboxSettingsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: MessageInboxSetting[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new MessageCreatedInboxSettingsEvent({
        payload: this.aggregateRoots.map(
          (inboxSetting) =>
            new MessageCreatedInboxSettingEvent({
              payload: {
                id: inboxSetting.id.value,
                accountId: inboxSetting.accountId.value,
                lastReadMessageRowId: inboxSetting.lastReadMessageRowId.value,
                createdAt: inboxSetting.createdAt?.value,
                updatedAt: inboxSetting.updatedAt?.value,
                deletedAt: inboxSetting.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new MessageUpdatedInboxSettingsEvent({
        payload: this.aggregateRoots.map(
          (inboxSetting) =>
            new MessageUpdatedInboxSettingEvent({
              payload: {
                id: inboxSetting.id.value,
                accountId: inboxSetting.accountId.value,
                lastReadMessageRowId: inboxSetting.lastReadMessageRowId.value,
                createdAt: inboxSetting.createdAt?.value,
                updatedAt: inboxSetting.updatedAt?.value,
                deletedAt: inboxSetting.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new MessageDeletedInboxSettingsEvent({
        payload: this.aggregateRoots.map(
          (inboxSetting) =>
            new MessageDeletedInboxSettingEvent({
              payload: {
                id: inboxSetting.id.value,
                rowId: inboxSetting.rowId.value,
                accountId: inboxSetting.accountId.value,
                lastReadMessageRowId: inboxSetting.lastReadMessageRowId.value,
                createdAt: inboxSetting.createdAt?.value,
                updatedAt: inboxSetting.updatedAt?.value,
                deletedAt: inboxSetting.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
