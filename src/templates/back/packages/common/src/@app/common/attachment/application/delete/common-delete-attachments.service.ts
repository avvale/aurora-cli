import {
  CommonAddAttachmentsContextEvent,
  CommonIAttachmentRepository,
} from '@app/common/attachment';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAttachmentsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAttachmentRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const attachments = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (attachments.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddAttachmentsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const attachmentsRegistered = this.publisher.mergeObjectContext(
      new CommonAddAttachmentsContextEvent(attachments),
    );

    attachmentsRegistered.deleted(); // apply event to model events
    attachmentsRegistered.commit(); // commit all events of model
  }
}
