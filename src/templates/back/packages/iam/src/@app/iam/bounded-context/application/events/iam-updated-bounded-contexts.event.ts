import { IamUpdatedBoundedContextEvent } from './iam-updated-bounded-context.event';

export class IamUpdatedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: IamUpdatedBoundedContextEvent[],
    ) {}
}
