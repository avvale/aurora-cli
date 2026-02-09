/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2Id } from '@app/common/administrative-area-level-2/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel2ByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    id: CommonAdministrativeAreaLevel2Id,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const administrativeAreaLevel2 = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(administrativeAreaLevel2.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const administrativeAreaLevel2Register = this.publisher.mergeObjectContext(
      administrativeAreaLevel2,
    );

    administrativeAreaLevel2Register.deleted({
      payload: administrativeAreaLevel2,
      cQMetadata,
    }); // apply event to model events
    administrativeAreaLevel2Register.commit(); // commit all events of model
  }
}
