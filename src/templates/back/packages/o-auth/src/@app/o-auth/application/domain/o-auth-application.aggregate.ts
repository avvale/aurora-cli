/* eslint-disable key-spacing */
import {
  OAuthCreatedApplicationEvent,
  OAuthDeletedApplicationEvent,
  OAuthUpdatedApplicationEvent,
} from '@app/o-auth/application';
import {
  OAuthApplicationClientIds,
  OAuthApplicationCode,
  OAuthApplicationCreatedAt,
  OAuthApplicationDeletedAt,
  OAuthApplicationId,
  OAuthApplicationIsMaster,
  OAuthApplicationName,
  OAuthApplicationRowId,
  OAuthApplicationSecret,
  OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { OAuthClient } from '@app/o-auth/client';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthApplication extends AggregateRoot {
  id: OAuthApplicationId;
  rowId: OAuthApplicationRowId;
  code: OAuthApplicationCode;
  name: OAuthApplicationName;
  secret: OAuthApplicationSecret;
  isMaster: OAuthApplicationIsMaster;
  clientIds: OAuthApplicationClientIds;
  createdAt: OAuthApplicationCreatedAt;
  updatedAt: OAuthApplicationUpdatedAt;
  deletedAt: OAuthApplicationDeletedAt;
  clients: OAuthClient[];

  constructor(
    id: OAuthApplicationId,
    rowId: OAuthApplicationRowId,
    code: OAuthApplicationCode,
    name: OAuthApplicationName,
    secret: OAuthApplicationSecret,
    isMaster: OAuthApplicationIsMaster,
    clientIds: OAuthApplicationClientIds,
    createdAt: OAuthApplicationCreatedAt,
    updatedAt: OAuthApplicationUpdatedAt,
    deletedAt: OAuthApplicationDeletedAt,
    clients?: OAuthClient[],
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.code = code;
    this.name = name;
    this.secret = secret;
    this.isMaster = isMaster;
    this.clientIds = clientIds;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.clients = clients;
  }

  static register(
    id: OAuthApplicationId,
    rowId: OAuthApplicationRowId,
    code: OAuthApplicationCode,
    name: OAuthApplicationName,
    secret: OAuthApplicationSecret,
    isMaster: OAuthApplicationIsMaster,
    clientIds: OAuthApplicationClientIds,
    createdAt: OAuthApplicationCreatedAt,
    updatedAt: OAuthApplicationUpdatedAt,
    deletedAt: OAuthApplicationDeletedAt,
    clients?: OAuthClient[],
  ): OAuthApplication {
    return new OAuthApplication(
      id,
      rowId,
      code,
      name,
      secret,
      isMaster,
      clientIds,
      createdAt,
      updatedAt,
      deletedAt,
      clients,
    );
  }

  created(event: { payload: OAuthApplication; cQMetadata?: CQMetadata }): void {
    this.apply(
      new OAuthCreatedApplicationEvent({
        payload: {
          id: event.payload.id.value,
          code: event.payload.code.value,
          name: event.payload.name.value,
          secret: event.payload.secret.value,
          isMaster: event.payload.isMaster.value,
          clientIds: event.payload.clientIds?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: OAuthApplication; cQMetadata?: CQMetadata }): void {
    this.apply(
      new OAuthUpdatedApplicationEvent({
        payload: {
          id: event.payload.id?.value,
          code: event.payload.code?.value,
          name: event.payload.name?.value,
          secret: event.payload.secret?.value,
          isMaster: event.payload.isMaster?.value,
          clientIds: event.payload.clientIds?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: OAuthApplication; cQMetadata?: CQMetadata }): void {
    this.apply(
      new OAuthDeletedApplicationEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          code: event.payload.code.value,
          name: event.payload.name.value,
          secret: event.payload.secret.value,
          isMaster: event.payload.isMaster.value,
          clientIds: event.payload.clientIds?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      rowId: this.rowId.value,
      code: this.code.value,
      name: this.name.value,
      secret: this.secret.value,
      isMaster: this.isMaster.value,
      clientIds: this.clientIds?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      clients: this.clients?.map((item) => item.toDTO()),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      code: this.code.value,
      name: this.name.value,
      secret: this.secret.value,
      isMaster: this.isMaster.value,
      clientIds: this.clientIds?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      clients: this.clients?.map((item) => item.toDTO()),
    };
  }
}
