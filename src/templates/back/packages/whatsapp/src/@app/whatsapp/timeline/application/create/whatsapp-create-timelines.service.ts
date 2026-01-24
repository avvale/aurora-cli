import {
  WhatsappAddTimelinesContextEvent,
  WhatsappITimelineRepository,
  WhatsappTimeline,
} from '@app/whatsapp/timeline';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineCreatedAt,
  WhatsappTimelineId,
  WhatsappTimelineUpdatedAt,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappCreateTimelinesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: WhatsappITimelineRepository,
  ) {}

  async main(
    payload: {
      id: WhatsappTimelineId;
      accounts: WhatsappTimelineAccounts;
      wabaPhoneNumberId: WhatsappTimelineWabaPhoneNumberId;
      wabaContactId: WhatsappTimelineWabaContactId;
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const aggregateTimelines = payload.map((timeline) =>
      WhatsappTimeline.register(
        timeline.id,
        timeline.accounts,
        timeline.wabaPhoneNumberId,
        timeline.wabaContactId,
        new WhatsappTimelineCreatedAt({ currentTimestamp: true }),
        new WhatsappTimelineUpdatedAt({ currentTimestamp: true }),
        null, // deleteAt
      ),
    );

    // insert
    await this.repository.insert(aggregateTimelines, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddTimelinesContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const timelinesRegistered = this.publisher.mergeObjectContext(
      new WhatsappAddTimelinesContextEvent(aggregateTimelines),
    );

    timelinesRegistered.created(); // apply event to model events
    timelinesRegistered.commit(); // commit all events of model
  }
}
