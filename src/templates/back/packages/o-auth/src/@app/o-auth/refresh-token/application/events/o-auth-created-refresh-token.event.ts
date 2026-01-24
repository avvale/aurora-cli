import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedRefreshTokenEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        accessTokenId: string;
        token: string;
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
