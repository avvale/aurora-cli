import { DeletedBoundedContextEvent } from './deleted-bounded-context.event';

export class DeletedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: DeletedBoundedContextEvent[],
    ) {}
}