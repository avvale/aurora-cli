import { OAuthCreatedScopeEvent } from '@app/o-auth/scope';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedScopesEvent {
  constructor(
    public readonly event: {
      payload: OAuthCreatedScopeEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
