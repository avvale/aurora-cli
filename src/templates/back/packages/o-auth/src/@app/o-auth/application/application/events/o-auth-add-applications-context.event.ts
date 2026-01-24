import {
  OAuthApplication,
  OAuthCreatedApplicationEvent,
  OAuthCreatedApplicationsEvent,
  OAuthDeletedApplicationEvent,
  OAuthDeletedApplicationsEvent,
} from '@app/o-auth/application';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddApplicationsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: OAuthApplication[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new OAuthCreatedApplicationsEvent({
        payload: this.aggregateRoots.map(
          (application) =>
            new OAuthCreatedApplicationEvent({
              payload: {
                id: application.id.value,
                code: application.code.value,
                name: application.name.value,
                secret: application.secret.value,
                isMaster: application.isMaster.value,
                clientIds: application.clientIds?.value,
                createdAt: application.createdAt?.value,
                updatedAt: application.updatedAt?.value,
                deletedAt: application.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new OAuthDeletedApplicationsEvent({
        payload: this.aggregateRoots.map(
          (application) =>
            new OAuthDeletedApplicationEvent({
              payload: {
                id: application.id.value,
                rowId: application.rowId.value,
                code: application.code.value,
                name: application.name.value,
                secret: application.secret.value,
                isMaster: application.isMaster.value,
                clientIds: application.clientIds?.value,
                createdAt: application.createdAt?.value,
                updatedAt: application.updatedAt?.value,
                deletedAt: application.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
