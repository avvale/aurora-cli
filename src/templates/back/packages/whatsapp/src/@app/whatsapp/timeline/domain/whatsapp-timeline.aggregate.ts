/* eslint-disable key-spacing */
import {
  WhatsappCreatedTimelineEvent,
  WhatsappDeletedTimelineEvent,
  WhatsappUpdatedTimelineEvent,
} from '@app/whatsapp/timeline';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineCreatedAt,
  WhatsappTimelineDeletedAt,
  WhatsappTimelineId,
  WhatsappTimelineUpdatedAt,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappTimeline extends AggregateRoot {
  id: WhatsappTimelineId;
  accounts: WhatsappTimelineAccounts;
  wabaPhoneNumberId: WhatsappTimelineWabaPhoneNumberId;
  wabaContactId: WhatsappTimelineWabaContactId;
  createdAt: WhatsappTimelineCreatedAt;
  updatedAt: WhatsappTimelineUpdatedAt;
  deletedAt: WhatsappTimelineDeletedAt;

  constructor(
    id: WhatsappTimelineId,
    accounts: WhatsappTimelineAccounts,
    wabaPhoneNumberId: WhatsappTimelineWabaPhoneNumberId,
    wabaContactId: WhatsappTimelineWabaContactId,
    createdAt: WhatsappTimelineCreatedAt,
    updatedAt: WhatsappTimelineUpdatedAt,
    deletedAt: WhatsappTimelineDeletedAt,
  ) {
    super();
    this.id = id;
    this.accounts = accounts;
    this.wabaPhoneNumberId = wabaPhoneNumberId;
    this.wabaContactId = wabaContactId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static register(
    id: WhatsappTimelineId,
    accounts: WhatsappTimelineAccounts,
    wabaPhoneNumberId: WhatsappTimelineWabaPhoneNumberId,
    wabaContactId: WhatsappTimelineWabaContactId,
    createdAt: WhatsappTimelineCreatedAt,
    updatedAt: WhatsappTimelineUpdatedAt,
    deletedAt: WhatsappTimelineDeletedAt,
  ): WhatsappTimeline {
    return new WhatsappTimeline(
      id,
      accounts,
      wabaPhoneNumberId,
      wabaContactId,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  created(timeline: WhatsappTimeline): void {
    this.apply(
      new WhatsappCreatedTimelineEvent(
        timeline.id.value,
        timeline.accounts?.value,
        timeline.wabaPhoneNumberId.value,
        timeline.wabaContactId.value,
        timeline.createdAt?.value,
        timeline.updatedAt?.value,
        timeline.deletedAt?.value,
      ),
    );
  }

  updated(timeline: WhatsappTimeline): void {
    this.apply(
      new WhatsappUpdatedTimelineEvent(
        timeline.id?.value,
        timeline.accounts?.value,
        timeline.wabaPhoneNumberId?.value,
        timeline.wabaContactId?.value,
        timeline.createdAt?.value,
        timeline.updatedAt?.value,
        timeline.deletedAt?.value,
      ),
    );
  }

  deleted(timeline: WhatsappTimeline): void {
    this.apply(
      new WhatsappDeletedTimelineEvent(
        timeline.id.value,
        timeline.accounts?.value,
        timeline.wabaPhoneNumberId.value,
        timeline.wabaContactId.value,
        timeline.createdAt?.value,
        timeline.updatedAt?.value,
        timeline.deletedAt?.value,
      ),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      accounts: this.accounts?.value,
      wabaPhoneNumberId: this.wabaPhoneNumberId.value,
      wabaContactId: this.wabaContactId.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      accounts: this.accounts?.value,
      wabaPhoneNumberId: this.wabaPhoneNumberId.value,
      wabaContactId: this.wabaContactId.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }
}
