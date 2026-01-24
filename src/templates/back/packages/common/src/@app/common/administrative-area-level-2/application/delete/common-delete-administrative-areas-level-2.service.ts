import {
  CommonAddAdministrativeAreasLevel2ContextEvent,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel2Service {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const administrativeAreasLevel2 = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (administrativeAreasLevel2.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddAdministrativeAreasLevel2ContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const administrativeAreasLevel2Registered =
      this.publisher.mergeObjectContext(
        new CommonAddAdministrativeAreasLevel2ContextEvent(
          administrativeAreasLevel2,
        ),
      );

    administrativeAreasLevel2Registered.deleted(); // apply event to model events
    administrativeAreasLevel2Registered.commit(); // commit all events of model
  }
}
