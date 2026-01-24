import {
  WhatsappCreatedTimelineEvent,
  WhatsappCreatedTimelinesEvent,
  WhatsappDeletedTimelineEvent,
  WhatsappDeletedTimelinesEvent,
  WhatsappTimeline,
  WhatsappUpdatedAndIncrementedTimelineEvent,
  WhatsappUpdatedAndIncrementedTimelinesEvent,
  WhatsappUpdatedTimelineEvent,
  WhatsappUpdatedTimelinesEvent,
} from '@app/whatsapp/timeline';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappAddTimelinesContextEvent extends AggregateRoot {
  constructor(public readonly aggregateRoots: WhatsappTimeline[] = []) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new WhatsappCreatedTimelinesEvent(
        this.aggregateRoots.map(
          (timeline) =>
            new WhatsappCreatedTimelineEvent(
              timeline.id.value,
              timeline.accounts?.value,
              timeline.wabaPhoneNumberId.value,
              timeline.wabaContactId.value,
              timeline.createdAt?.value,
              timeline.updatedAt?.value,
              timeline.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  updated(): void {
    this.apply(
      new WhatsappUpdatedTimelinesEvent(
        this.aggregateRoots.map(
          (timeline) =>
            new WhatsappUpdatedTimelineEvent(
              timeline.id.value,
              timeline.accounts?.value,
              timeline.wabaPhoneNumberId.value,
              timeline.wabaContactId.value,
              timeline.createdAt?.value,
              timeline.updatedAt?.value,
              timeline.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  updatedAndIncremented(): void {
    this.apply(
      new WhatsappUpdatedAndIncrementedTimelinesEvent(
        this.aggregateRoots.map(
          (timeline) =>
            new WhatsappUpdatedAndIncrementedTimelineEvent(
              timeline.id.value,
              timeline.accounts?.value,
              timeline.wabaPhoneNumberId.value,
              timeline.wabaContactId.value,
              timeline.createdAt?.value,
              timeline.updatedAt?.value,
              timeline.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  deleted(): void {
    this.apply(
      new WhatsappDeletedTimelinesEvent(
        this.aggregateRoots.map(
          (timeline) =>
            new WhatsappDeletedTimelineEvent(
              timeline.id.value,
              timeline.accounts?.value,
              timeline.wabaPhoneNumberId.value,
              timeline.wabaContactId.value,
              timeline.createdAt?.value,
              timeline.updatedAt?.value,
              timeline.deletedAt?.value,
            ),
        ),
      ),
    );
  }
}
