import { IamCreatedBoundedContextEvent } from './iam-created-bounded-context.event';

export class IamCreatedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: IamCreatedBoundedContextEvent[],
    ) {}
}
