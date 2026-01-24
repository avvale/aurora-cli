import { CommonIResourceRepository } from '@app/common/resource';
import { CommonResourceId } from '@app/common/resource/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteResourceByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIResourceRepository,
  ) {}

  async main(
    id: CommonResourceId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const resource = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(resource.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const resourceRegister = this.publisher.mergeObjectContext(resource);

    resourceRegister.deleted(resource); // apply event to model events
    resourceRegister.commit(); // commit all events of model
  }
}
