import {
  WhatsappAddTimelinesContextEvent,
  WhatsappITimelineRepository,
  WhatsappTimeline,
} from '@app/whatsapp/timeline';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineId,
  WhatsappTimelineUpdatedAt,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateAndIncrementTimelinesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: WhatsappITimelineRepository,
  ) {}

  async main(
    payload: {
      id?: WhatsappTimelineId;
      accounts?: WhatsappTimelineAccounts;
      wabaPhoneNumberId?: WhatsappTimelineWabaPhoneNumberId;
      wabaContactId?: WhatsappTimelineWabaContactId;
    },
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const timeline = WhatsappTimeline.register(
      payload.id,
      payload.accounts,
      payload.wabaPhoneNumberId,
      payload.wabaContactId,
      null, // createdAt
      new WhatsappTimelineUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update and increment
    await this.repository.updateAndIncrement(timeline, {
      queryStatement,
      constraint,
      cQMetadata,
      updateAndIncrementOptions: cQMetadata?.repositoryOptions,
    });

    // get objects to delete
    const timelines = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const timelinesRegister = this.publisher.mergeObjectContext(
      new WhatsappAddTimelinesContextEvent(timelines),
    );

    timelinesRegister.updatedAndIncremented(); // apply event to model events
    timelinesRegister.commit(); // commit all events of model
  }
}
