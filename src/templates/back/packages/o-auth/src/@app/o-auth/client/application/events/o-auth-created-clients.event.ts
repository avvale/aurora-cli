import { OAuthCreatedClientEvent } from '@app/o-auth/client';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedClientsEvent {
  constructor(
    public readonly event: {
      payload: OAuthCreatedClientEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
