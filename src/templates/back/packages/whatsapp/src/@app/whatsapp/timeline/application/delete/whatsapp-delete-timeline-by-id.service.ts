import { WhatsappITimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappTimelineId } from '@app/whatsapp/timeline/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappDeleteTimelineByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: WhatsappITimelineRepository,
  ) {}

  async main(
    id: WhatsappTimelineId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const timeline = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(timeline.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const timelineRegister = this.publisher.mergeObjectContext(timeline);

    timelineRegister.deleted(timeline); // apply event to model events
    timelineRegister.commit(); // commit all events of model
  }
}
