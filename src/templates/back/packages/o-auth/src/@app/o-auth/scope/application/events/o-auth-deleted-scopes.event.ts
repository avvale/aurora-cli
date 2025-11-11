import { OAuthDeletedScopeEvent } from '@app/o-auth/scope';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedScopesEvent {
    constructor(
        public readonly event: {
            payload: OAuthDeletedScopeEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
