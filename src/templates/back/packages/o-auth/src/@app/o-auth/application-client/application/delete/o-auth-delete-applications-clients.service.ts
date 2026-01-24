import {
  OAuthAddApplicationsClientsContextEvent,
  OAuthIApplicationClientRepository,
} from '@app/o-auth/application-client';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteApplicationsClientsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: OAuthIApplicationClientRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const applicationsClients = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (applicationsClients.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddApplicationsClientsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const applicationsClientsRegistered = this.publisher.mergeObjectContext(
      new OAuthAddApplicationsClientsContextEvent(
        applicationsClients,
        cQMetadata,
      ),
    );

    applicationsClientsRegistered.deleted(); // apply event to model events
    applicationsClientsRegistered.commit(); // commit all events of model
  }
}
