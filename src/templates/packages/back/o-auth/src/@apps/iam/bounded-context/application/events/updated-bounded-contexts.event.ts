import { UpdatedBoundedContextEvent } from './updated-bounded-context.event';

export class UpdatedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: UpdatedBoundedContextEvent[],
    ) {}
}