import {
  OAuthAddClientsContextEvent,
  OAuthIClientRepository,
} from '@app/o-auth/client';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteClientsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: OAuthIClientRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const clients = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (clients.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddClientsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const clientsRegistered = this.publisher.mergeObjectContext(
      new OAuthAddClientsContextEvent(clients, cQMetadata),
    );

    clientsRegistered.deleted(); // apply event to model events
    clientsRegistered.commit(); // commit all events of model
  }
}
