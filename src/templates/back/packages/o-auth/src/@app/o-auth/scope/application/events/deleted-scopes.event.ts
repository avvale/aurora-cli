import { DeletedScopeEvent } from './deleted-scope.event';

export class DeletedScopesEvent
{
    constructor(
        public readonly scopes: DeletedScopeEvent[],
    ) {}
}