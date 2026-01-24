import { CommonIAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonAttachmentFamilyId } from '@app/common/attachment-family/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAttachmentFamilyByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAttachmentFamilyRepository,
  ) {}

  async main(
    id: CommonAttachmentFamilyId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const attachmentFamily = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(attachmentFamily.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const attachmentFamilyRegister =
      this.publisher.mergeObjectContext(attachmentFamily);

    attachmentFamilyRegister.deleted(attachmentFamily); // apply event to model events
    attachmentFamilyRegister.commit(); // commit all events of model
  }
}
