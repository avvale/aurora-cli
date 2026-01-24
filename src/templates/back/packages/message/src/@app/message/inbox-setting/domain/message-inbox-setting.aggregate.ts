/* eslint-disable key-spacing */
import {
  MessageCreatedInboxSettingEvent,
  MessageDeletedInboxSettingEvent,
  MessageUpdatedInboxSettingEvent,
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
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageInboxSetting extends AggregateRoot {
  id: MessageInboxSettingId;
  rowId: MessageInboxSettingRowId;
  accountId: MessageInboxSettingAccountId;
  lastReadMessageRowId: MessageInboxSettingLastReadMessageRowId;
  createdAt: MessageInboxSettingCreatedAt;
  updatedAt: MessageInboxSettingUpdatedAt;
  deletedAt: MessageInboxSettingDeletedAt;

  constructor(
    id: MessageInboxSettingId,
    rowId: MessageInboxSettingRowId,
    accountId: MessageInboxSettingAccountId,
    lastReadMessageRowId: MessageInboxSettingLastReadMessageRowId,
    createdAt: MessageInboxSettingCreatedAt,
    updatedAt: MessageInboxSettingUpdatedAt,
    deletedAt: MessageInboxSettingDeletedAt,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.accountId = accountId;
    this.lastReadMessageRowId = lastReadMessageRowId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static register(
    id: MessageInboxSettingId,
    rowId: MessageInboxSettingRowId,
    accountId: MessageInboxSettingAccountId,
    lastReadMessageRowId: MessageInboxSettingLastReadMessageRowId,
    createdAt: MessageInboxSettingCreatedAt,
    updatedAt: MessageInboxSettingUpdatedAt,
    deletedAt: MessageInboxSettingDeletedAt,
  ): MessageInboxSetting {
    return new MessageInboxSetting(
      id,
      rowId,
      accountId,
      lastReadMessageRowId,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  created(event: {
    payload: MessageInboxSetting;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new MessageCreatedInboxSettingEvent({
        payload: {
          id: event.payload.id.value,
          accountId: event.payload.accountId.value,
          lastReadMessageRowId: event.payload.lastReadMessageRowId.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: {
    payload: MessageInboxSetting;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new MessageUpdatedInboxSettingEvent({
        payload: {
          id: event.payload.id?.value,
          accountId: event.payload.accountId?.value,
          lastReadMessageRowId: event.payload.lastReadMessageRowId?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: {
    payload: MessageInboxSetting;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new MessageDeletedInboxSettingEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          accountId: event.payload.accountId.value,
          lastReadMessageRowId: event.payload.lastReadMessageRowId.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      rowId: this.rowId.value,
      accountId: this.accountId.value,
      lastReadMessageRowId: this.lastReadMessageRowId.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      accountId: this.accountId.value,
      lastReadMessageRowId: this.lastReadMessageRowId.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }
}
