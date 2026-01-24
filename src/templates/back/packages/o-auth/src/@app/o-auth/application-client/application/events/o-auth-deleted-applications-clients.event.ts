import { OAuthDeletedApplicationClientEvent } from '@app/o-auth/application-client';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedApplicationsClientsEvent {
  constructor(
    public readonly event: {
      payload: OAuthDeletedApplicationClientEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
