import { OAuthDeletedApplicationEvent } from '@app/o-auth/application';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedApplicationsEvent {
  constructor(
    public readonly event: {
      payload: OAuthDeletedApplicationEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
