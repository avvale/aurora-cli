import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedAccessTokenEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        clientId: string;
        accountId: string;
        token: string;
        name: string;
        isRevoked: boolean;
        expiresAt: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
