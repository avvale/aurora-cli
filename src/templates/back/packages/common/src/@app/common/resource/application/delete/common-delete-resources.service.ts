import {
  CommonAddResourcesContextEvent,
  CommonIResourceRepository,
} from '@app/common/resource';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteResourcesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIResourceRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const resources = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (resources.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddResourcesContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const resourcesRegistered = this.publisher.mergeObjectContext(
      new CommonAddResourcesContextEvent(resources),
    );

    resourcesRegistered.deleted(); // apply event to model events
    resourcesRegistered.commit(); // commit all events of model
  }
}
