import { IamUpdatedAndIncrementedBoundedContextEvent } from './iam-updated-and-incremented-bounded-context.event';

export class IamUpdatedAndIncrementedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: IamUpdatedAndIncrementedBoundedContextEvent[],
    ) {}
}
