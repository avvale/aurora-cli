import { IamUpdatedAndIncrementedTagEvent } from './iam-updated-and-incremented-tag.event';

export class IamUpdatedAndIncrementedTagsEvent
{
    constructor(
        public readonly tags: IamUpdatedAndIncrementedTagEvent[],
    ) {}
}
