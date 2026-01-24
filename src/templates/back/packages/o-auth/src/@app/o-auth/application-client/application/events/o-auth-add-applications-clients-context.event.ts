import {
  OAuthApplicationClient,
  OAuthCreatedApplicationClientEvent,
  OAuthCreatedApplicationsClientsEvent,
  OAuthDeletedApplicationClientEvent,
  OAuthDeletedApplicationsClientsEvent,
} from '@app/o-auth/application-client';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddApplicationsClientsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: OAuthApplicationClient[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new OAuthCreatedApplicationsClientsEvent({
        payload: this.aggregateRoots.map(
          (applicationClient) =>
            new OAuthCreatedApplicationClientEvent({
              payload: {
                applicationId: applicationClient.applicationId.value,
                clientId: applicationClient.clientId.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new OAuthDeletedApplicationsClientsEvent({
        payload: this.aggregateRoots.map(
          (applicationClient) =>
            new OAuthDeletedApplicationClientEvent({
              payload: {
                applicationId: applicationClient.applicationId.value,
                clientId: applicationClient.clientId.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
