import { IamDeletedBoundedContextEvent } from './iam-deleted-bounded-context.event';

export class IamDeletedBoundedContextsEvent
{
    constructor(
        public readonly boundedContexts: IamDeletedBoundedContextEvent[],
    ) {}
}
