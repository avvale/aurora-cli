import { OAuthDeletedScopeEvent } from './o-auth-deleted-scope.event';

export class OAuthDeletedScopesEvent
{
    constructor(
        public readonly scopes: OAuthDeletedScopeEvent[],
    ) {}
}
