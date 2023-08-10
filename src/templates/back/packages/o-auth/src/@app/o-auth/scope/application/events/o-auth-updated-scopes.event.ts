import { OAuthUpdatedScopeEvent } from './o-auth-updated-scope.event';

export class OAuthUpdatedScopesEvent
{
    constructor(
        public readonly scopes: OAuthUpdatedScopeEvent[],
    ) {}
}
