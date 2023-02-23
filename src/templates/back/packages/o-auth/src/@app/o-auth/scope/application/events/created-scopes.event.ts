import { CreatedScopeEvent } from './created-scope.event';

export class CreatedScopesEvent
{
    constructor(
        public readonly scopes: CreatedScopeEvent[],
    ) {}
}