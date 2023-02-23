import { CreatedBoundedContextEvent } from './created-bounded-context.event';

export class CreatedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: CreatedBoundedContextEvent[],
    ) {}
}