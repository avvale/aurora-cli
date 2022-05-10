import { UpdatedScopeEvent } from './updated-scope.event';

export class UpdatedScopesEvent
{
    constructor(
        public readonly scopes: UpdatedScopeEvent[],
    ) {}
}