/* eslint-disable key-spacing */
import { OAuthApplication } from '@app/o-auth/application';
import {
  OAuthCreatedApplicationClientEvent,
  OAuthDeletedApplicationClientEvent,
  OAuthUpdatedApplicationClientEvent,
} from '@app/o-auth/application-client';
import {
  OAuthApplicationClientApplicationId,
  OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { OAuthClient } from '@app/o-auth/client';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthApplicationClient extends AggregateRoot {
  applicationId: OAuthApplicationClientApplicationId;
  clientId: OAuthApplicationClientClientId;
  application: OAuthApplication;
  client: OAuthClient;

  constructor(
    applicationId: OAuthApplicationClientApplicationId,
    clientId: OAuthApplicationClientClientId,
    application?: OAuthApplication,
    client?: OAuthClient,
  ) {
    super();
    this.applicationId = applicationId;
    this.clientId = clientId;
    this.application = application;
    this.client = client;
  }

  static register(
    applicationId: OAuthApplicationClientApplicationId,
    clientId: OAuthApplicationClientClientId,
    application?: OAuthApplication,
    client?: OAuthClient,
  ): OAuthApplicationClient {
    return new OAuthApplicationClient(
      applicationId,
      clientId,
      application,
      client,
    );
  }

  created(event: {
    payload: OAuthApplicationClient;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new OAuthCreatedApplicationClientEvent({
        payload: {
          applicationId: event.payload.applicationId.value,
          clientId: event.payload.clientId.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: {
    payload: OAuthApplicationClient;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new OAuthUpdatedApplicationClientEvent({
        payload: {
          applicationId: event.payload.applicationId?.value,
          clientId: event.payload.clientId?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: {
    payload: OAuthApplicationClient;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new OAuthDeletedApplicationClientEvent({
        payload: {
          applicationId: event.payload.applicationId.value,
          clientId: event.payload.clientId.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      applicationId: this.applicationId.value,
      clientId: this.clientId.value,
      application: this.application?.toDTO(),
      client: this.client?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      applicationId: this.applicationId.value,
      clientId: this.clientId.value,
      application: this.application?.toDTO(),
      client: this.client?.toDTO(),
    };
  }
}
