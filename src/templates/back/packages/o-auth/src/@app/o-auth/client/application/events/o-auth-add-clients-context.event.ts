import {
  OAuthClient,
  OAuthCreatedClientEvent,
  OAuthCreatedClientsEvent,
  OAuthDeletedClientEvent,
  OAuthDeletedClientsEvent,
} from '@app/o-auth/client';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddClientsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: OAuthClient[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new OAuthCreatedClientsEvent({
        payload: this.aggregateRoots.map(
          (client) =>
            new OAuthCreatedClientEvent({
              payload: {
                id: client.id.value,
                grantType: client.grantType.value,
                name: client.name.value,
                secret: client.secret.value,
                authUrl: client.authUrl?.value,
                redirect: client.redirect?.value,
                scopeOptions: client.scopeOptions?.value,
                expiredAccessToken: client.expiredAccessToken?.value,
                expiredRefreshToken: client.expiredRefreshToken?.value,
                isActive: client.isActive.value,
                isMaster: client.isMaster.value,
                applicationIds: client.applicationIds?.value,
                createdAt: client.createdAt?.value,
                updatedAt: client.updatedAt?.value,
                deletedAt: client.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new OAuthDeletedClientsEvent({
        payload: this.aggregateRoots.map(
          (client) =>
            new OAuthDeletedClientEvent({
              payload: {
                id: client.id.value,
                rowId: client.rowId.value,
                grantType: client.grantType.value,
                name: client.name.value,
                secret: client.secret.value,
                authUrl: client.authUrl?.value,
                redirect: client.redirect?.value,
                scopeOptions: client.scopeOptions?.value,
                expiredAccessToken: client.expiredAccessToken?.value,
                expiredRefreshToken: client.expiredRefreshToken?.value,
                isActive: client.isActive.value,
                isMaster: client.isMaster.value,
                applicationIds: client.applicationIds?.value,
                createdAt: client.createdAt?.value,
                updatedAt: client.updatedAt?.value,
                deletedAt: client.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
