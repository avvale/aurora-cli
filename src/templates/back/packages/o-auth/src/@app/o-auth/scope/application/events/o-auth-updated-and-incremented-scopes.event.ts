import { OAuthUpdatedAndIncrementedScopeEvent } from './o-auth-updated-and-incremented-scope.event';

export class OAuthUpdatedAndIncrementedScopesEvent
{
    constructor(
        public readonly scopes: OAuthUpdatedAndIncrementedScopeEvent[],
    ) {}
}
