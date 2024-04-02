import { IamUpdatedTagEvent } from './iam-updated-tag.event';

export class IamUpdatedTagsEvent
{
    constructor(
        public readonly tags: IamUpdatedTagEvent[],
    ) {}
}
