import { CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3Id } from '@app/common/administrative-area-level-3/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel3ByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel3Repository,
  ) {}

  async main(
    id: CommonAdministrativeAreaLevel3Id,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const administrativeAreaLevel3 = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(administrativeAreaLevel3.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const administrativeAreaLevel3Register = this.publisher.mergeObjectContext(
      administrativeAreaLevel3,
    );

    administrativeAreaLevel3Register.deleted(administrativeAreaLevel3); // apply event to model events
    administrativeAreaLevel3Register.commit(); // commit all events of model
  }
}
