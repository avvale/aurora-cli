import {
  OAuthAccessToken,
  OAuthDeletedAccessTokenEvent,
  OAuthDeletedAccessTokensEvent,
} from '@app/o-auth/access-token';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddAccessTokensContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: OAuthAccessToken[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  deleted(): void {
    this.apply(
      new OAuthDeletedAccessTokensEvent({
        payload: this.aggregateRoots.map(
          (accessToken) =>
            new OAuthDeletedAccessTokenEvent({
              payload: {
                id: accessToken.id.value,
                rowId: accessToken.rowId.value,
                clientId: accessToken.clientId.value,
                accountId: accessToken.accountId?.value,
                token: accessToken.token.value,
                name: accessToken.name?.value,
                isRevoked: accessToken.isRevoked.value,
                expiresAt: accessToken.expiresAt?.value,
                createdAt: accessToken.createdAt?.value,
                updatedAt: accessToken.updatedAt?.value,
                deletedAt: accessToken.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
