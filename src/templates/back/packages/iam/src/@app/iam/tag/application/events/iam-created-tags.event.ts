import { IamCreatedTagEvent } from './iam-created-tag.event';

export class IamCreatedTagsEvent
{
    constructor(
        public readonly tags: IamCreatedTagEvent[],
    ) {}
}
