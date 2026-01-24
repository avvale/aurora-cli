import {
  CommonAddAttachmentLibrariesContextEvent,
  CommonIAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAttachmentLibrariesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAttachmentLibraryRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const attachmentLibraries = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (attachmentLibraries.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddAttachmentLibrariesContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const attachmentLibrariesRegistered = this.publisher.mergeObjectContext(
      new CommonAddAttachmentLibrariesContextEvent(attachmentLibraries),
    );

    attachmentLibrariesRegistered.deleted(); // apply event to model events
    attachmentLibrariesRegistered.commit(); // commit all events of model
  }
}
