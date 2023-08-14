import { OAuthCreatedScopeEvent } from './o-auth-created-scope.event';

export class OAuthCreatedScopesEvent
{
    constructor(
        public readonly scopes: OAuthCreatedScopeEvent[],
    ) {}
}
